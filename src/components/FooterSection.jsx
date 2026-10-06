import React, { useEffect, useRef } from 'react';

export default function FooterSection() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (hostRef.current && canvasRef.current && typeof window.initVectorWordmark === 'function') {
      window.initVectorWordmark(hostRef.current, canvasRef.current, {
        text: 'FUTURE LEADERS',
        font: {
          variant: 'Extra Bold',
          fontSize: '360px',
          textAlign: 'center',
          fontFamily: 'Bebas Neue',
          fontWeight: 800,
          lineHeight: '1em',
          letterSpacing: '0.04em',
        },
        background: '#0E0404',
        textColor: '#FFFFFF',
        shade: '#8E8E98',
        accent: 'rgba(255, 60, 0, 0.5)',
        reach: 340,
        handles: {
          size: 120,
          labels: true,
          spread: 27,
        },
      });
    }
  }, []);

  return (
    <footer id="footer-section" className="site-footer" aria-label="Site Footer">
      <div className="vector-wordmark-wrap" id="vector-wordmark-wrap">
        <div className="vector-wordmark-box" id="vector-wordmark-host" ref={hostRef}>
          <canvas id="vector-wordmark-canvas" ref={canvasRef}></canvas>

          {/* Footer Bottom Bar */}
          <div className="footer-bottom-bar">
            <span className="footer-copyright">© 2026 Future Leaders. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
