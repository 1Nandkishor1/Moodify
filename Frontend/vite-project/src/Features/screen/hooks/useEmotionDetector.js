import { useRef, useEffect } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { detectExpression } from "../services/expressionService";
import { detectGesture } from "../services/gestureService";
import { useEmotionContext } from "../EmotionContext";
import { useSong } from "../../Home/hooks/useSong";


export const useEmotionDetector = (controls) => {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const faceMeshRef = useRef(null);
  const isRunningRef = useRef(false);
    const handsRef = useRef(null);

  // ✅ FIX: useRef instead of normal variable
  const isEmotionDetectedRef = useRef(false);
   const lastGestureRef = useRef(false);
  const lastEmotionRef = useRef(null);
  const lastTriggerTime = useRef(0);

  const { emotion, setEmotion, isRunning, setIsRunning } = useEmotionContext();
  const { handlegetsong } = useSong();
  


  useEffect(() => {
  isRunningRef.current = isRunning;
}, [isRunning]);

  // 🔹 Initialize FaceMesh
  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
    });

    faceMesh.onResults((results) => {
        // if (!isRunning) return; 
      if (!results.multiFaceLandmarks?.length) return;

      // ✅ block after first detection
      if (isEmotionDetectedRef.current) return;

      const lm = results.multiFaceLandmarks[0];
      const result = detectExpression(lm);

      setEmotion(result);
      
      isEmotionDetectedRef.current = true; // mark detected
      
    });

    faceMeshRef.current = faceMesh;


     const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => {
      if (!isRunningRef.current) return;
      if (!results.multiHandLandmarks?.length) return;

      const lm = results.multiHandLandmarks[0];
      const gesture = detectGesture(lm);

      handleGesture(gesture);
    });

    handsRef.current = hands;
  }, []);


  const handleGesture = (gesture) => {
    if (gesture === "unknown") return;

    if (lastGestureRef.current === gesture) return;
    if (Date.now() - lastTriggerTime.current < 1500) return;

    lastGestureRef.current = gesture;
    lastTriggerTime.current = Date.now();

    console.log("Gesture:", gesture);

    if (!controls) return;

    switch (gesture) {
      case "palm":
        controls.stop();
        break;
      case "fist":
        controls.play();
        break;
      case "peace":
        controls.next();
        break;
      default:
        break;
    }
  };

  // 🔹 Trigger API when emotion changes
  useEffect(() => {
     if (!isRunning) return; 
    if (!emotion || emotion === "Detecting..." || emotion === "Stopped") return;

    if (lastEmotionRef.current === emotion) return;


    lastEmotionRef.current = emotion;

    console.log("Emotion detected:", emotion);

    handlegetsong(emotion);
  }, [emotion,isRunning]);

  // 🔹 Start Camera
  const start = () => {
    // ✅ reset detection flag
    isEmotionDetectedRef.current = false;

    if (!videoRef.current || !faceMeshRef.current) return;

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        const image = videoRef.current;

        await faceMeshRef.current.send({ image });
         await handsRef.current.send({ image }); // 👈 SAME FRAM
      },
      width: 640,
      height: 480,
    });

    camera.start();
    cameraRef.current = camera;
    setIsRunning(true);
    setEmotion("Detecting...");
  };

  // 🔹 Stop Camera
  const stop = () => {
      setIsRunning(false); // ✅ FIRST block everything

  setEmotion("Stopped");
  isEmotionDetectedRef.current = false;

  cameraRef.current?.stop();

  if (videoRef.current?.srcObject) {
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
  }
    
  };

  return {
    videoRef,
    start,
    stop,
    isRunning,
    emotion,
  };
};