import { useEffect, useState } from 'react';

export function PageLoader() {
  const [loaderVisible, setLoaderVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setLoaderVisible(false);
      document.body.style.overflow = '';
    }, 4900);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!loaderVisible) return null;

  return (
    <div className="page-loader-backdrop">
      <style dangerouslySetInnerHTML={{ __html: `
        .page-loader-backdrop {
          position: fixed;
          inset: 0;
          background: #000000;
          z-index: 999999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex-direction: column;
          animation: backdropExit 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
          animation-delay: 4.0s;
        }

        .page-loader-content {
          animation: contentExit 0.4s ease forwards;
          animation-delay: 3.8s;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .page-loader-box {
          width: 120px;
          height: 120px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          background: transparent;
          position: relative;
          overflow: hidden;
          animation: borderReveal 0.5s ease forwards;
          opacity: 0;
          transform: scale(0.85);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .page-loader-box {
            width: 100px;
            height: 100px;
          }
        }

        .page-loader-fill {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background: #FFFFFF;
          animation: fillBox 2.8s cubic-bezier(0.45, 0.05, 0.15, 1.0) forwards;
          animation-delay: 0.4s;
        }

        .page-loader-initials {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 500;
          color: #000000;
          position: absolute;
          letter-spacing: 0.08em;
          opacity: 0;
          transform: translateY(8px);
          animation: textReveal 0.4s ease forwards;
          animation-delay: 3.0s;
          z-index: 2;
        }

        @media (max-width: 768px) {
          .page-loader-initials {
            font-size: 28px;
          }
        }

        .page-loader-brand {
          margin-top: 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          text-transform: uppercase;
          text-align: center;
          color: rgba(255, 255, 255, 0);
          letter-spacing: 0.5em;
          animation: brandNameReveal 0.8s ease forwards;
          animation-delay: 3.0s;
        }

        @media (max-width: 768px) {
          .page-loader-brand {
            font-size: 9px;
          }
        }

        @keyframes borderReveal {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes fillBox {
          0% { height: 0%; opacity: 1; }
          100% { height: 100%; opacity: 1; }
        }

        @keyframes textReveal {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes brandNameReveal {
          0% {
            color: rgba(255,255,255,0);
            letter-spacing: 0.5em;
          }
          100% {
            color: rgba(255,255,255,0.5);
            letter-spacing: 0.35em;
          }
        }

        @keyframes contentExit {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.08); }
        }

        @keyframes backdropExit {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-100%); }
        }
      `}} />

      <div className="page-loader-content">
        <div className="page-loader-box">
          <div className="page-loader-fill"></div>
          <div className="page-loader-initials">SI</div>
        </div>
        <div className="page-loader-brand">SUKRIT INFRASTRUCTURE</div>
      </div>
    </div>
  );
}
