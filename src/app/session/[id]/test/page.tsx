'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

export default function ScreenShareTestPage() {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [peerConnections, setPeerConnections] = useState<Map<string, RTCPeerConnection>>(new Map());
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // 화면 공유 시작
  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // 기존 연결된 피어들에게 새로운 스트림 전송
      peerConnections.forEach((pc) => {
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });
      });
    } catch (error) {
      console.error('화면 공유 시작 중 오류 발생:', error);
    }
  };

  // 화면 공유 중지
  const stopScreenShare = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }

      // 피어 연결에서 트랙 제거
      peerConnections.forEach((pc) => {
        pc.getSenders().forEach((sender) => {
          pc.removeTrack(sender);
        });
      });
    }
  };

  // 새로운 피어 연결 생성
  const createPeerConnection = (peerId: string) => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: 'turn:your-turn-server.com:3478',
          username: 'username',
          credential: 'password'
        }
      ]
    });

    // 로컬 스트림 추가
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
      });
    }

    // ICE candidate 이벤트 처리
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        // TODO: Signaling 서버를 통해 상대방에게 candidate 전송
        console.log('New ICE candidate:', event.candidate);
      }
    };

    // 원격 스트림 수신 처리
    pc.ontrack = (event) => {
      const remoteVideo = remoteVideoRefs.current.get(peerId);
      if (remoteVideo) {
        remoteVideo.srcObject = event.streams[0];
      }
    };

    setPeerConnections(prev => new Map(prev.set(peerId, pc)));
    return pc;
  };

  // 연결 제안 생성 및 전송
  const createOffer = async (peerId: string) => {
    const pc = createPeerConnection(peerId);
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      // TODO: Signaling 서버를 통해 상대방에게 offer 전송
      console.log('Created offer:', offer);
    } catch (error) {
      console.error('Offer 생성 중 오류 발생:', error);
    }
  };

  // 연결 제안 수락
  const handleOffer = async (peerId: string, offer: RTCSessionDescriptionInit) => {
    const pc = createPeerConnection(peerId);
    try {
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      
      // TODO: Signaling 서버를 통해 상대방에게 answer 전송
      console.log('Created answer:', answer);
    } catch (error) {
      console.error('Answer 생성 중 오류 발생:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 space-y-4">
        <h1 className="text-2xl font-bold">화면 공유 테스트</h1>
        <div className="space-x-4">
          <Button
            onClick={startScreenShare}
            disabled={!!localStream}
          >
            화면 공유 시작
          </Button>
          <Button
            onClick={stopScreenShare}
            disabled={!localStream}
            variant="white"
          >
            화면 공유 중지
          </Button>
          <Button
            onClick={() => createOffer('test-peer-id')}
          >
            연결 테스트
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">로컬 화면</h2>
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full bg-black"
          />
        </Card>
        <Card className="p-4">
          <h2 className="mb-2 font-semibold">원격 화면</h2>
          <video
            ref={(el) => {
              if (el) remoteVideoRefs.current.set('test-peer-id', el);
            }}
            autoPlay
            playsInline
            className="w-full bg-black"
          />
        </Card>
      </div>
    </div>
  );
}
