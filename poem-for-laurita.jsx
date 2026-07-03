import { useState, useEffect } from "react";

const poem = [
  {
    stanza: "To my Laurita\nTú eres bonita\nI wanted to show you more of my feelings\nBut even words can't show what I'm really meaning",
  },
  {
    stanza: "When we talk it's like ice cream\nFrozen and sweet but it always feels warm\nYou're everything I could ever dream\nI want to be wrapped within your arms",
  },
  {
    stanza: "No matter the tone\nI just want to hear the voice that I enjoy\nIt takes over everything\nAnd fills me with joy",
  },
  {
    stanza: "The separation caused by the sea\nOur unbreakable bond\nIt means nothing when it comes to you and me\nOur little something that goes beyond",
  },
  {
    stanza: "The smile of a fallen angel\nAt every glance it gets more brilliant\nI can barely believe it's real\nEveryday you're always so radiant",
  },
  {
    stanza: "Everything between us is going well\nI really believe we will build a story only time could tell\nI hope you know those feelings I have are true\nI thank the stars that I've met you",
  },
];

function FloatingHeart({ style }) {
  return (
    <div style={{
      position: "fixed",
      fontSize: style.size,
      color: "#ff69b4",
      opacity: style.opacity,
      left: style.left,
      top: style.top,
      animation: `floatUp ${style.duration}s ease-in infinite`,
      animationDelay: style.delay,
      pointerEvents: "none",
      zIndex: 0,
    }}>♥</div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [visibleStanzas, setVisibleStanzas] = useState([]);
  const [shaking, setShaking] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const h = Array.from({ length: 12 }, (_, i) => ({
      size: `${Math.random() * 14 + 10}px`,
      opacity: Math.random() * 0.25 + 0.08,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 6 + 5,
      delay: `${Math.random() * 4}s`,
    }));
    setHearts(h);
  }, []);

  useEffect(() => {
    if (!opened) return;
    poem.forEach((_, i) => {
      setTimeout(() => {
        setVisibleStanzas((prev) => [...prev, i]);
      }, i * 600 + 300);
    });
  }, [opened]);

  const handleClick = () => {
    if (!opened) {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setOpened(true);
      }, 600);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@300;400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #0a0a0a;
          min-height: 100vh;
          font-family: 'Lato', sans-serif;
        }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0.15; }
          50% { opacity: 0.25; }
          100% { transform: translateY(-80px) scale(0.7); opacity: 0; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          15% { transform: translateX(-6px) rotate(-2deg); }
          30% { transform: translateX(6px) rotate(2deg); }
          45% { transform: translateX(-4px) rotate(-1deg); }
          60% { transform: translateX(4px) rotate(1deg); }
          75% { transform: translateX(-2px) rotate(0deg); }
        }

        @keyframes lidOpen {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-140deg); }
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 18px #ff69b450, 0 0 40px #ff69b420; }
          50% { box-shadow: 0 0 30px #ff69b470, 0 0 60px #ff69b430; }
        }

        @keyframes ribbonShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .gift-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          user-select: none;
          animation: ${shaking ? "shake 0.6s ease" : "glowPulse 3s ease-in-out infinite"};
          transition: transform 0.2s;
          position: relative;
          z-index: 2;
        }

        .gift-wrapper:hover .box-body {
          box-shadow: 0 0 40px #ff69b460, 0 8px 32px #00000080;
        }

        .gift-wrapper:hover {
          transform: scale(1.03);
        }

        .box-scene {
          perspective: 600px;
          position: relative;
        }

        .box-lid {
          width: 180px;
          height: 50px;
          background: linear-gradient(135deg, #c2185b, #e91e8c, #ad1457);
          border-radius: 6px 6px 0 0;
          position: relative;
          transform-origin: bottom center;
          transform-style: preserve-3d;
          animation: ${opened ? "lidOpen 0.7s ease forwards" : "none"};
          z-index: 3;
          box-shadow: 0 -2px 12px #ff69b440;
        }

        .lid-ribbon {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 22px;
          height: 100%;
          background: linear-gradient(90deg, #ff69b4, #fff8, #ff69b4, #fff8, #ff69b4);
          background-size: 200% auto;
          animation: ribbonShimmer 2s linear infinite;
          border-radius: 2px;
        }

        .box-body {
          width: 180px;
          height: 140px;
          background: linear-gradient(160deg, #1a0010, #0d0008, #1a0010);
          border: 1.5px solid #c2185b55;
          border-top: none;
          border-radius: 0 0 8px 8px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 32px #00000080, 0 0 20px #ff69b430;
          transition: box-shadow 0.3s;
        }

        .body-ribbon-v {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 22px;
          height: 100%;
          background: linear-gradient(90deg, #ff69b4, #fff8, #ff69b4, #fff8, #ff69b4);
          background-size: 200% auto;
          animation: ribbonShimmer 2s linear infinite;
        }

        .bow {
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 2px;
          z-index: 4;
        }

        .bow-loop {
          width: 28px;
          height: 22px;
          background: radial-gradient(ellipse, #ff69b4 60%, #c2185b);
          border-radius: 50% 50% 0 50%;
          box-shadow: 0 0 8px #ff69b480;
        }

        .bow-loop.right {
          border-radius: 50% 50% 50% 0;
          transform: scaleX(-1);
        }

        .prompt {
          margin-top: 24px;
          color: #ff69b488;
          font-size: 13px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          animation: fadeSlideIn 1s ease 0.3s both;
        }

        .poem-container {
          max-width: 560px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
          position: relative;
          z-index: 2;
        }

        .poem-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #ff69b466;
          margin-bottom: 40px;
          animation: fadeSlideIn 0.8s ease both;
        }

        .stanza {
          text-align: center;
          margin-bottom: 36px;
          animation: fadeSlideIn 0.8s ease both;
        }

        .stanza p {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(17px, 4vw, 22px);
          font-weight: 300;
          font-style: italic;
          line-height: 1.85;
          color: #f5e6ee;
          letter-spacing: 0.3px;
        }

        .stanza p:first-child {
          font-style: normal;
          font-weight: 400;
          color: #ffb3d1;
        }

        .stanza-divider {
          width: 30px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ff69b455, transparent);
          margin: 0 auto 36px;
          animation: fadeSlideIn 0.8s ease both;
        }

        .closing-heart {
          margin-top: 8px;
          font-size: 22px;
          color: #ff69b4;
          animation: fadeSlideIn 0.8s ease both, glowPulse 2s ease-in-out infinite;
          filter: drop-shadow(0 0 8px #ff69b480);
        }
      `}</style>

      <div className="page">
        {hearts.map((h, i) => <FloatingHeart key={i} style={h} />)}

        {!opened ? (
          <div className="gift-wrapper" onClick={handleClick}>
            <div className="box-scene">
              <div className="bow">
                <div className="bow-loop"></div>
                <div className="bow-loop right"></div>
              </div>
              <div className="box-lid">
                <div className="lid-ribbon"></div>
              </div>
              <div className="box-body">
                <div className="body-ribbon-v"></div>
              </div>
            </div>
            <p className="prompt">tap to open ♥</p>
          </div>
        ) : (
          <div className="poem-container">
            <p className="poem-title">For Laurita</p>
            {poem.map((s, i) =>
              visibleStanzas.includes(i) ? (
                <div key={i} style={{ width: "100%", animationDelay: `0s` }}>
                  <div className="stanza">
                    {s.stanza.split("\n").map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                  {i < poem.length - 1 && <div className="stanza-divider" />}
                </div>
              ) : null
            )}
            {visibleStanzas.length === poem.length && (
              <div className="closing-heart">♥</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
