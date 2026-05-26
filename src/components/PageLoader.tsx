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

        .page-loader-logo {
          width: 120px;
          height: 120px;
          object-fit: contain;
          opacity: 0;
          animation: logoFadeIn 2.5s ease forwards;
          animation-delay: 0.5s;
        }

        @media (max-width: 768px) {
          .page-loader-logo {
            width: 100px;
            height: 100px;
          }
        }

        .page-loader-brand {
          margin-top: 24px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          text-transform: uppercase;
          text-align: center;
          color: rgba(255, 255, 255, 0);
          letter-spacing: 0.3em;
          animation: brandNameReveal 1.5s ease forwards;
          animation-delay: 1.5s;
        }

        @media (max-width: 768px) {
          .page-loader-brand {
            font-size: 11px;
            letter-spacing: 0.2em;
          }
        }

        @keyframes logoFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes brandNameReveal {
          0% {
            color: rgba(255,255,255,0);
            transform: translateY(10px);
          }
          100% {
            color: rgba(255,255,255,0.8);
            transform: translateY(0);
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
        <img
          src="/431137390_909527687630657_177047404084965694_n (1).jpg"
          alt="Sukrit Infrastructure Logo"
          className="page-loader-logo"
        />
        <div className="page-loader-brand">SUKRIT INFRASTRUCTURE PVT LTD</div>
      </div>
    </div>
  );
}
