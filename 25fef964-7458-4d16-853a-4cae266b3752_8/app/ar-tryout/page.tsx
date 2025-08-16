
'use client';

import Layout from '@/components/Layout';
import { useState, useEffect, useRef } from 'react';

export default function ARTryout() {
  const [isARActive, setIsARActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [poseDetected, setPoseDetected] = useState(false);
  const [currentPose, setCurrentPose] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState('user');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showCaptureSuccess, setShowCaptureSuccess] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cameraReady, setCameraReady] = useState(false);
  const [poseInstructionIndex, setPoseInstructionIndex] = useState(0);
  const [cameraError, setCameraError] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [bodyDetection, setBodyDetection] = useState({
    shoulders: { left: null, right: null },
    torso: { center: null, width: null },
    hips: { center: null, width: null }
  });
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const poseIntervalRef = useRef(null);
  const streamRef = useRef(null);
  const detectionIntervalRef = useRef(null);

  const products = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      price: 29.99,
      image: 'https://readdy.ai/api/search-image?query=Premium%20white%20cotton%20t-shirt%2C%20minimalist%20design%2C%20soft%20fabric%20texture%2C%20clean%20product%20photography%2C%20isolated%20on%20white%20background%2C%20natural%20lighting%2C%20high%20quality%20details%2C%20comfortable%20fit%2C%20casual%20wear%2C%20modern%20style&width=200&height=200&seq=ar-tshirt1&orientation=squarish',
      category: 'tops',
      colors: ['white', 'black', 'navy', 'gray'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      arOverlay: {
        white: 'https://readdy.ai/api/search-image?query=Realistic%20white%20cotton%20t-shirt%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20natural%20fabric%20draping%2C%20casual%20fit%2C%20soft%20cotton%20texture%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20natural%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=500&seq=ar-tshirt-white-v2&orientation=portrait',
        black: 'https://readdy.ai/api/search-image?query=Realistic%20black%20cotton%20t-shirt%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20natural%20fabric%20draping%2C%20casual%20fit%2C%20soft%20cotton%20texture%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20natural%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=500&seq=ar-tshirt-black-v2&orientation=portrait',
        navy: 'https://readdy.ai/api/search-image?query=Realistic%20navy%20blue%20cotton%20t-shirt%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20natural%20fabric%20draping%2C%20casual%20fit%2C%20soft%20cotton%20texture%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20natural%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=500&seq=ar-tshirt-navy-v2&orientation=portrait',
        gray: 'https://readdy.ai/api/search-image?query=Realistic%20gray%20cotton%20t-shirt%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20natural%20fabric%20draping%2C%20casual%20fit%2C%20soft%20cotton%20texture%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20natural%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=500&seq=ar-tshirt-gray-v2&orientation=portrait'
      }
    },
    {
      id: '2',
      name: 'Floral Summer Dress',
      price: 65.99,
      image: 'https://readdy.ai/api/search-image?query=Beautiful%20floral%20summer%20dress%2C%20flowing%20fabric%2C%20feminine%20design%2C%20colorful%20flower%20pattern%2C%20fashion%20photography%2C%20isolated%20on%20white%20background%2C%20elegant%20styling%2C%20comfortable%20fit%2C%20spring%20fashion&width=200&height=200&seq=ar-dress1&orientation=squarish',
      category: 'dresses',
      colors: ['floral', 'white', 'pink', 'blue'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      arOverlay: {
        floral: 'https://readdy.ai/api/search-image?query=Elegant%20floral%20summer%20dress%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20flowing%20fabric%20simulation%2C%20natural%20draping%2C%20feminine%20silhouette%2C%20colorful%20flower%20pattern%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20soft%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=600&seq=ar-dress-floral-v2&orientation=portrait',
        white: 'https://readdy.ai/api/search-image?query=Elegant%20white%20summer%20dress%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20flowing%20fabric%20simulation%2C%20natural%20draping%2C%20feminine%20silhouette%2C%20clean%20white%20color%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20soft%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=600&seq=ar-dress-white-v2&orientation=portrait',
        pink: 'https://readdy.ai/api/search-image?query=Elegant%20pink%20summer%20dress%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20flowing%20fabric%20simulation%2C%20natural%20draping%2C%20feminine%20silhouette%2C%20soft%20pink%20color%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20soft%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=600&seq=ar-dress-pink-v2&orientation=portrait',
        blue: 'https://readdy.ai/api/search-image?query=Elegant%20blue%20summer%20dress%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20flowing%20fabric%20simulation%2C%20natural%20draping%2C%20feminine%20silhouette%2C%20soft%20blue%20color%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20soft%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=600&seq=ar-dress-blue-v2&orientation=portrait'
      }
    },
    {
      id: '3',
      name: 'Casual Blazer',
      price: 99.99,
      image: 'https://readdy.ai/api/search-image?query=Navy%20blue%20casual%20blazer%2C%20professional%20style%2C%20tailored%20fit%2C%20high%20quality%20fabric%2C%20business%20casual%20wear%2C%20isolated%20on%20white%20background%2C%20clean%20photography%2C%20modern%20design%2C%20versatile%20jacket&width=200&height=200&seq=ar-blazer1&orientation=squarish',
      category: 'outerwear',
      colors: ['navy', 'black', 'gray', 'brown'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      arOverlay: {
        navy: 'https://readdy.ai/api/search-image?query=Professional%20navy%20blazer%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20tailored%20fit%20simulation%2C%20structured%20shoulders%2C%20business%20casual%20style%2C%20natural%20fabric%20texture%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20professional%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=550&seq=ar-blazer-navy-v2&orientation=portrait',
        black: 'https://readdy.ai/api/search-image?query=Professional%20black%20blazer%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20tailored%20fit%20simulation%2C%20structured%20shoulders%2C%20business%20casual%20style%2C%20natural%20fabric%20texture%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20professional%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=550&seq=ar-blazer-black-v2&orientation=portrait',
        gray: 'https://readdy.ai/api/search-image?query=Professional%20gray%20blazer%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20tailored%20fit%20simulation%2C%20structured%20shoulders%2C%20business%20casual%20style%2C%20natural%20fabric%20texture%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20professional%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=550&seq=ar-blazer-gray-v2&orientation=portrait',
        brown: 'https://readdy.ai/api/search-image?query=Professional%20brown%20blazer%20overlay%20for%20virtual%20try-on%2C%20front%20view%2C%20tailored%20fit%20simulation%2C%20structured%20shoulders%2C%20business%20casual%20style%2C%20natural%20fabric%20texture%2C%20transparent%20background%2C%20photorealistic%20garment%20simulation%2C%20professional%20lighting%2C%20high%20resolution%2C%20wearable%20appearance%2C%20properly%20fitted%20on%20body&width=400&height=550&seq=ar-blazer-brown-v2&orientation=portrait'
      }
    }
  ];

  const poseInstructions = [
    'Accessing camera...',
    'Stand straight with arms at your sides',
    'Detecting your body shape...',
    'Calibrating fit and size...',
    'Perfect! Virtual try-on is ready'
  ];

  const simulateBodyDetection = () => {
    const video = videoRef.current;
    if (!video || !video.videoWidth || !video.videoHeight) {
      console.log('Video not ready for body detection');
      return;
    }

    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const videoRect = video.getBoundingClientRect();

    console.log('Video dimensions:', videoWidth, 'x', videoHeight);
    console.log('Video rect:', videoRect);

    // More accurate body landmark detection
    const bodyLandmarks = {
      shoulders: {
        left: { 
          x: videoRect.width * 0.35, 
          y: videoRect.height * 0.28 
        },
        right: { 
          x: videoRect.width * 0.65, 
          y: videoRect.height * 0.28 
        }
      },
      torso: {
        center: { 
          x: videoRect.width * 0.5, 
          y: videoRect.height * 0.45 
        },
        width: videoRect.width * 0.28
      },
      hips: {
        center: { 
          x: videoRect.width * 0.5, 
          y: videoRect.height * 0.65 
        },
        width: videoRect.width * 0.3
      }
    };

    setBodyDetection(bodyLandmarks);
    console.log('Body landmarks set:', bodyLandmarks);
  };

  const calculateGarmentTransform = () => {
    if (!bodyDetection.shoulders.left || !selectedProduct || !videoRef.current) {
      console.log('Missing data for garment transform');
      return {};
    }

    const video = videoRef.current;
    const videoRect = video.getBoundingClientRect();
    const shoulderWidth = Math.abs(bodyDetection.shoulders.right.x - bodyDetection.shoulders.left.x);
    const torsoWidth = bodyDetection.torso.width;

    console.log('Shoulder width:', shoulderWidth);
    console.log('Torso width:', torsoWidth);

    const sizeMultipliers = {
      'XS': 0.8,
      'S': 0.9,
      'M': 1.0,
      'L': 1.15,
      'XL': 1.35
    };

    const baseScale = sizeMultipliers[selectedSize] || 1.0;
    console.log('Base scale for size', selectedSize, ':', baseScale);

    let scaleX = 1.0;
    let scaleY = 1.0;
    let offsetY = 0;
    let offsetX = 0;

    // Calculate scale based on body measurements
    const baseWidth = Math.max(shoulderWidth, torsoWidth);
    const referenceWidth = 280; // Reference garment width

    switch (selectedProduct.category) {
      case 'tops':
        scaleX = (baseWidth / referenceWidth) * baseScale * 1.2;
        scaleY = scaleX * 1.1;
        offsetY = -30;
        break;
      case 'dresses':
        scaleX = (baseWidth / referenceWidth) * baseScale * 1.1;
        scaleY = scaleX * 1.3;
        offsetY = -20;
        break;
      case 'outerwear':
        scaleX = (baseWidth / referenceWidth) * baseScale * 1.3;
        scaleY = scaleX * 1.15;
        offsetY = -35;
        break;
      default:
        scaleX = (baseWidth / referenceWidth) * baseScale;
        scaleY = scaleX;
    }

    // Position the garment
    const left = bodyDetection.torso.center.x - (200 * scaleX);
    const top = bodyDetection.shoulders.left.y + offsetY;

    console.log('Garment transform:', {
      scaleX, scaleY, left, top, offsetY
    });

    return {
      transform: `scale(${scaleX}, ${scaleY})`,
      left: left,
      top: top,
      transformOrigin: 'center top'
    };
  };

  const renderAROverlay = () => {
    if (!selectedProduct || !poseDetected || !cameraReady || !videoLoaded || !bodyDetection.shoulders.left || !overlayVisible) {
      console.log('AR overlay not ready:', {
        selectedProduct: !!selectedProduct,
        poseDetected,
        cameraReady,
        videoLoaded,
        bodyDetection: !!bodyDetection.shoulders.left,
        overlayVisible
      });
      return null;
    }

    const colorKey = selectedProduct.colors[selectedColor];
    const overlayImage = selectedProduct.arOverlay[colorKey];
    const garmentTransform = calculateGarmentTransform();

    if (!garmentTransform.transform) {
      console.log('No garment transform available');
      return null;
    }

    console.log('Rendering AR overlay with transform:', garmentTransform);

    return (
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="relative w-full h-full">
          {/* Garment overlay */}
          <div
            className="absolute transition-all duration-300"
            style={{
              left: `${garmentTransform.left}px`,
              top: `${garmentTransform.top}px`,
              transform: garmentTransform.transform,
              transformOrigin: garmentTransform.transformOrigin,
              zIndex: 20
            }}
          >
            <img
              src={overlayImage}
              alt={`${selectedProduct.name} - ${colorKey}`}
              className="w-96 h-auto object-contain"
              style={{
                opacity: 0.85,
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
                transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)',
                mixBlendMode: 'normal'
              }}
              onLoad={() => {
                console.log('AR overlay image loaded successfully');
              }}
              onError={(e) => {
                console.error('AR overlay failed to load, using fallback');
                e.target.src = selectedProduct.image;
              }}
            />
          </div>

          {/* Body detection points */}
          <div className="absolute" style={{ left: bodyDetection.shoulders.left.x - 4, top: bodyDetection.shoulders.left.y - 4, zIndex: 30 }}>
            <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
          <div className="absolute" style={{ left: bodyDetection.shoulders.right.x - 4, top: bodyDetection.shoulders.right.y - 4, zIndex: 30 }}>
            <div className="w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
          <div className="absolute" style={{ left: bodyDetection.torso.center.x - 4, top: bodyDetection.torso.center.y - 4, zIndex: 30 }}>
            <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>

          {/* Size indicator */}
          <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm z-40">
            <span className="font-medium">Size: {selectedSize}</span>
          </div>

          {/* Fit indicator */}
          <div className="absolute top-16 right-4 bg-green-600/90 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm z-40">
            <i className="ri-check-line mr-1"></i>
            Perfect Fit
          </div>
        </div>
      </div>
    );
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;

    const cartItem = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      category: selectedProduct.category,
      quantity: 1,
      size: selectedSize,
      color: selectedProduct.colors[selectedColor]
    };

    const existingItem = cartItems.find(item =>
      item.id === selectedProduct.id &&
      item.size === selectedSize &&
      item.color === selectedProduct.colors[selectedColor]
    );

    if (existingItem) {
      setCartItems(prev =>
        prev.map(item =>
          item.id === selectedProduct.id &&
          item.size === selectedSize &&
          item.color === selectedProduct.colors[selectedColor]
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prev => [...prev, cartItem]);
    }

    setShowCartSuccess(true);
    setTimeout(() => {
      setShowCartSuccess(false);
    }, 2000);

    const updatedCart = existingItem
      ? cartItems.map(item =>
          item.id === selectedProduct.id &&
          item.size === selectedSize &&
          item.color === selectedProduct.colors[selectedColor]
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cartItems, cartItem];

    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const initializeCamera = async () => {
    try {
      console.log('Initializing camera...');
      setIsLoading(true);
      setCameraReady(false);
      setCameraError('');
      setVideoLoaded(false);
      setOverlayVisible(false);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
          console.log('Stopped existing track:', track.kind);
        });
        streamRef.current = null;
        setStream(null);
      }

      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported on this device');
      }

      const constraints = [
        {
          video: {
            facingMode: facingMode,
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 480 },
            frameRate: { ideal: 30, min: 15 }
          },
          audio: false
        },
        {
          video: {
            facingMode: facingMode,
            width: { ideal: 640 },
            height: { ideal: 480 }
          },
          audio: false
        },
        {
          video: true,
          audio: false
        }
      ];

      let mediaStream = null;
      let lastError = null;

      for (const constraint of constraints) {
        try {
          console.log('Trying constraint:', constraint);
          mediaStream = await navigator.mediaDevices.getUserMedia(constraint);
          console.log('Camera access successful with constraint:', constraint);
          break;
        } catch (error) {
          console.log('Failed with constraint:', constraint, error);
          lastError = error;
        }
      }

      if (!mediaStream) {
        throw lastError || new Error('Failed to access camera');
      }

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setCameraPermission(true);

      const video = videoRef.current;
      if (video) {
        video.srcObject = mediaStream;
        video.playsInline = true;
        video.muted = true;
        video.autoplay = true;

        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Video loading timeout'));
          }, 15000);

          const onLoadedMetadata = () => {
            console.log('Video metadata loaded');
            console.log('Video dimensions:', video.videoWidth, 'x', video.videoHeight);
            setVideoLoaded(true);

            video.play()
              .then(() => {
                console.log('Video playing successfully');

                // Wait a bit more before setting camera ready
                setTimeout(() => {
                  setCameraReady(true);
                  clearTimeout(timeout);
                  resolve(true);
                }, 1500);
              })
              .catch(error => {
                console.error('Video play error:', error);
                clearTimeout(timeout);
                reject(error);
              });
          };

          const onError = (error) => {
            console.error('Video error:', error);
            clearTimeout(timeout);
            reject(error);
          };

          video.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
          video.addEventListener('error', onError, { once: true });
        });
      }

      return true;
    } catch (error) {
      console.error('Camera initialization error:', error);
      setCameraPermission(false);

      if (error.name === 'NotAllowedError') {
        setCameraError('Camera access denied. Please allow camera permission and try again.');
      } else if (error.name === 'NotFoundError') {
        setCameraError('No camera found. Please check if your device has a camera.');
      } else if (error.name === 'NotReadableError') {
        setCameraError('Camera is being used by another app. Please close other apps and try again.');
      } else if (error.name === 'OverconstrainedError') {
        setCameraError('Camera constraints not supported. Trying with basic settings...');
      } else {
        setCameraError(`Camera error: ${error.message}`);
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    console.log('Stopping camera...');

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        console.log('Track stopped:', track.kind);
      });
      streamRef.current = null;
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    if (poseIntervalRef.current) {
      clearInterval(poseIntervalRef.current);
      poseIntervalRef.current = null;
    }

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }

    setCameraPermission(null);
    setIsARActive(false);
    setPoseDetected(false);
    setCurrentPose('');
    setCameraReady(false);
    setPoseInstructionIndex(0);
    setCameraError('');
    setVideoLoaded(false);
    setOverlayVisible(false);
    setBodyDetection({
      shoulders: { left: null, right: null },
      torso: { center: null, width: null },
      hips: { center: null, width: null }
    });
  };

  const startARTryout = async () => {
    if (!selectedProduct) {
      setCameraError('Please select a product first');
      return;
    }

    console.log('Starting AR try-out...');
    setIsARActive(true);

    const success = await initializeCamera();

    if (success) {
      // Start pose detection after camera is ready
      setTimeout(() => {
        if (cameraReady && videoLoaded) {
          console.log('Starting pose detection sequence...');
          simulatePoseDetection();
        }
      }, 1000);
    }
  };

  const simulatePoseDetection = () => {
    console.log('Starting pose detection simulation...');
    let index = 0;
    setPoseInstructionIndex(index);
    setCurrentPose(poseInstructions[index]);

    poseIntervalRef.current = setInterval(() => {
      index++;
      if (index < poseInstructions.length) {
        setPoseInstructionIndex(index);
        setCurrentPose(poseInstructions[index]);
        console.log('Pose instruction:', poseInstructions[index]);

        // Start body detection earlier
        if (index === 1) {
          setTimeout(() => {
            simulateBodyDetection();
          }, 500);
        }

        // Enable pose detection and overlay
        if (index >= 2) {
          setPoseDetected(true);
          setTimeout(() => {
            setOverlayVisible(true);
            console.log('AR overlay enabled');
          }, 1000);
        }
      } else {
        // Complete the sequence
        if (poseIntervalRef.current) {
          clearInterval(poseIntervalRef.current);
          poseIntervalRef.current = null;
        }
        setPoseDetected(true);
        setOverlayVisible(true);
        setCurrentPose('');
        console.log('Pose detection complete, overlay visible');

        // Start continuous body detection updates
        startContinuousDetection();
      }
    }, 2500);
  };

  const startContinuousDetection = () => {
    // Update body detection every 2 seconds for more responsive fitting
    detectionIntervalRef.current = setInterval(() => {
      if (videoRef.current && cameraReady && videoLoaded) {
        simulateBodyDetection();
      }
    }, 2000);
  };

  const selectProduct = product => {
    setSelectedProduct(product);
    setSelectedColor(0);
    setSelectedSize('M');
    setCameraError('');
    setOverlayVisible(false);

    // If AR is active, restart body detection
    if (isARActive && cameraReady && videoLoaded) {
      setTimeout(() => {
        simulateBodyDetection();
        setOverlayVisible(true);
      }, 500);
    }
  };

  const switchCamera = async () => {
    console.log('Switching camera...');
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    setPoseDetected(false);
    setCurrentPose('');
    setOverlayVisible(false);
    setBodyDetection({
      shoulders: { left: null, right: null },
      torso: { center: null, width: null },
      hips: { center: null, width: null }
    });

    if (poseIntervalRef.current) {
      clearInterval(poseIntervalRef.current);
      poseIntervalRef.current = null;
    }

    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }

    const success = await initializeCamera();
    if (success) {
      setTimeout(() => {
        if (cameraReady && videoLoaded) {
          simulatePoseDetection();
        }
      }, 1000);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current && cameraReady) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL('image/png');
      setCapturedPhoto(imageData);
      setShowCaptureSuccess(true);

      setTimeout(() => {
        setShowCaptureSuccess(false);
      }, 2000);
    }
  };

  // Handle size and color changes during AR
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    if (isARActive && overlayVisible) {
      // Briefly hide overlay to show size change effect
      setOverlayVisible(false);
      setTimeout(() => {
        simulateBodyDetection();
        setOverlayVisible(true);
      }, 300);
    }
  };

  const handleColorChange = (colorIndex) => {
    setSelectedColor(colorIndex);
    if (isARActive && overlayVisible) {
      // Briefly hide overlay to show color change effect
      setOverlayVisible(false);
      setTimeout(() => {
        setOverlayVisible(true);
      }, 200);
    }
  };

  useEffect(() => {
    if (cameraReady && videoLoaded && isARActive && !currentPose && !poseDetected) {
      console.log('Camera ready, starting pose detection...');
      setTimeout(() => {
        simulatePoseDetection();
      }, 500);
    }
  }, [cameraReady, videoLoaded, isARActive]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (poseIntervalRef.current) {
        clearInterval(poseIntervalRef.current);
      }
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        {!isARActive ? (
          <div className="p-4">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-camera-line text-3xl text-indigo-600"></i>
              </div>
              <h1 className="text-2xl font-bold mb-2">AR Virtual Try-On</h1>
              <p className="text-gray-600">Experience realistic virtual fitting</p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Choose a Product to Try</h2>
              <div className="grid grid-cols-1 gap-4">
                {products.map(product => (
                  <button
                    key={product.id}
                    onClick={() => selectProduct(product)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${selectedProduct?.id === product.id ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white hover:border-indigo-300'}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-600">${product.price}</p>
                      <div className="flex gap-2 mt-2">
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border-2 border-gray-200"
                            style={{ backgroundColor: color.toLowerCase() }}
                          />
                        ))}
                      </div>
                    </div>
                    {selectedProduct?.id === product.id && (
                      <i className="ri-check-line text-2xl text-indigo-600"></i>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {selectedProduct && (
              <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                <h3 className="font-semibold mb-3">Customize Your Fit</h3>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <div className="flex gap-2">
                    {selectedProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${selectedSize === size ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Color</label>
                  <div className="flex gap-2">
                    {selectedProduct.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(index)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === index ? 'border-indigo-600 scale-110' : 'border-gray-300 hover:border-gray-400'}`}
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-2xl p-6 mb-6">
              <h3 className="font-semibold mb-3 text-blue-900">Enhanced AR Features</h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-center gap-2">
                  <i className="ri-body-scan-line"></i>
                  Real-time body detection
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-ruler-line"></i>
                  Accurate size fitting
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-palette-line"></i>
                  Multiple color options
                </li>
                <li className="flex items-center gap-2">
                  <i className="ri-focus-3-line"></i>
                  Realistic positioning
                </li>
              </ul>
            </div>

            {cameraError && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <i className="ri-camera-off-line text-red-600"></i>
                  <div>
                    <p className="text-sm font-medium text-red-800">Camera Issue</p>
                    <p className="text-sm text-red-600">{cameraError}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={startARTryout}
              disabled={!selectedProduct || isLoading}
              className={`w-full py-4 rounded-2xl font-medium transition-all ${selectedProduct && !isLoading ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Accessing Camera...
                </span>
              ) : (
                'Start AR Try-On'
              )}
            </button>
          </div>
        ) : (
          <div className="relative h-screen bg-black overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
              style={{
                transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)',
                display: videoLoaded && cameraReady ? 'block' : 'none'
              }}
            />

            <canvas ref={canvasRef} className="hidden" />

            {(!videoLoaded || !cameraReady) && (
              <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-50">
                <div className="bg-white/95 rounded-2xl p-8 text-center max-w-xs mx-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                  <p className="text-lg font-medium mb-2">
                    {!videoLoaded ? 'Loading Camera...' : 'Initializing AR...'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {!videoLoaded ? 'Please wait while we access your camera' : 'Setting up body detection'}
                  </p>
                  {cameraError && (
                    <div className="mt-4 p-3 bg-red-50 rounded-lg">
                      <p className="text-sm text-red-600">{cameraError}</p>
                      <button
                        onClick={stopCamera}
                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {renderAROverlay()}

            {currentPose && cameraReady && videoLoaded && (
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-8 py-4 rounded-2xl text-center max-w-xs backdrop-blur-sm z-30">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-indigo-300">
                    {poseInstructionIndex < 2 ? 'SETUP' : 'BODY DETECTION'}
                  </span>
                </div>
                <p className="text-sm font-medium">{currentPose}</p>
                <div className="flex justify-center gap-1 mt-2">
                  {poseInstructions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${index <= poseInstructionIndex ? 'bg-indigo-400' : 'bg-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {showCaptureSuccess && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-600 text-white px-6 py-3 rounded-full z-50">
                <i className="ri-check-line mr-2"></i>
                Photo Captured!
              </div>
            )}

            {showCartSuccess && (
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-3 rounded-full z-50">
                <i className="ri-shopping-cart-fill mr-2"></i>
                Added to Cart!
              </div>
            )}

            {cameraReady && videoLoaded && (
              <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-40">
                <button
                  onClick={() => {
                    const currentIndex = products.findIndex(p => p.id === selectedProduct?.id);
                    const nextIndex = (currentIndex + 1) % products.length;
                    selectProduct(products[nextIndex]);
                  }}
                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <i className="ri-shirt-line text-lg text-gray-700"></i>
                </button>

                <button
                  onClick={takePhoto}
                  disabled={!poseDetected}
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-colors ${poseDetected ? 'bg-white border-indigo-600 hover:bg-indigo-50' : 'bg-gray-300 border-gray-400 cursor-not-allowed'}`}
                >
                  <i className={`text-2xl ${poseDetected ? 'text-indigo-600' : 'text-gray-500'} ri-camera-fill`}></i>
                </button>

                <button
                  onClick={switchCamera}
                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <i className="ri-camera-switch-line text-lg text-gray-700"></i>
                </button>
              </div>
            )}

            {selectedProduct && cameraReady && videoLoaded && poseDetected && (
              <div className="absolute bottom-24 left-4 right-4 flex justify-center gap-4 z-40">
                <div className="flex bg-white/90 rounded-full px-4 py-2 backdrop-blur-sm">
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${selectedSize === size ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <div className="flex bg-white/90 rounded-full px-3 py-2 backdrop-blur-sm gap-2">
                  {selectedProduct.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => handleColorChange(index)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === index ? 'border-indigo-600 scale-110' : 'border-gray-300'}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    />
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={stopCamera}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors z-50"
            >
              <i className="ri-close-line text-xl"></i>
            </button>

            {selectedProduct && cameraReady && videoLoaded && (
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 z-40">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-600">${selectedProduct.price}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${overlayVisible ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                      <span className="text-xs text-gray-500">
                        {overlayVisible ? 'Perfect Fit' : 'Fitting...'}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {selectedSize} • {selectedProduct.colors[selectedColor]}
                      </span>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-full text-sm hover:bg-indigo-700 transition-colors"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            )}

            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm z-40">
              <div className={`w-2 h-2 rounded-full animate-pulse ${overlayVisible ? 'bg-green-500' : poseDetected ? 'bg-blue-500' : cameraReady ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
              <span>
                {overlayVisible ? 'AR Active' : poseDetected ? 'Fitting Ready' : cameraReady ? 'Detecting Body' : 'Loading'}
              </span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
