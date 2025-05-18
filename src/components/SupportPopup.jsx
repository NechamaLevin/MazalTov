import React, { useEffect, useState } from 'react';

function SupportPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 20000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Varela+Round&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }, []);

  if (!showPopup) return null;

  return (
    <div style={styles.overlay}>
      <div style={{ ...styles.popup, ...styles.blinkingBorder }}>
        <div style={styles.popupBackground}>
          <div style={styles.popupContent}>
            <h2 style={{ marginBottom: '10px', color: '#c27d83' }}>אהבתם? 🤌🏻</h2>

            <p>🌐 <strong>האתר פועל בהתנדבות וללא מטרות רווח,</strong><br />
              מתוך רצון להנגישו לכולם.
            </p>

            <p>תחזוקת האתר דורשת עלות חודשית  
              (כגון אחסון, דומיין ושירותים טכניים),  
              הממומנים עד כה באופן עצמאי.
            </p>

            <p>אם האתר תרם או הקל עליכם –  
              נשמח להשתתפות, אפילו קטנה,  
              כדי שנוכל להמשיך ולהתרחב 🫶🏻 
            </p>

            {!showDetails ? (
              <>
                <button style={styles.glowButton} onClick={() => setShowDetails(true)}>
                  אני רוצה להשתתף בסכום סמלי
                </button>
                <button style={styles.glowButtonSecondary} onClick={() => setShowPopup(false)}>
                  לא מעוניין
                </button>
              </>
            ) : (
              <div style={styles.detailsBox}>
                <p><strong>📄 פרטי חשבון להעברה:</strong></p>
                <p>בנק פאגי<br />סניף 179<br />מספר חשבון: 630861<br />שם המוטב: נחמה לוין<br />תודה רבה!</p>
                <button style={styles.closeBtn} onClick={() => setShowPopup(false)}>סגור</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000,
  },
  popup: {
    borderRadius: '16px',
    maxWidth: '450px',
    width: '90%',
    textAlign: 'right',
    direction: 'rtl',
    fontFamily: "'Varela Round', sans-serif",
    fontSize: '18px',
    border: '3px solid #c27d83',
    overflow: 'hidden',
  },
  blinkingBorder: {
    animation: 'blink 1s infinite',
  },
  popupBackground: {
    backgroundImage: 'url(/reka15.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '24px',
  },
  popupContent: {
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: '16px',
    borderRadius: '12px',
  },
  glowButton: {
    marginTop: '20px',
    backgroundColor: '#c27d83',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 0 10px #c27d83',
    marginLeft: '10px',
  },
  glowButtonSecondary: {
    marginTop: '20px',
    backgroundColor: '#fff0f5',
    color: '#c27d83',
    border: '2px solid #c27d83',
    padding: '10px 20px',
    borderRadius: '12px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 0 6px rgba(194, 125, 131, 0.3) inset',
  },
  detailsBox: {
    marginTop: '15px',
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '10px',
    lineHeight: '1.6',
    border: '1px solid #c27d83',
  },
  closeBtn: {
    marginTop: '10px',
    backgroundColor: '#c27d83',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 0 8px #c27d83',
  }
};

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes blink {
    0% { box-shadow: 0 0 10px #c27d83; }
    50% { box-shadow: 0 0 20px #c27d83; }
    100% { box-shadow: 0 0 10px #c27d83; }
  }
`, styleSheet.cssRules.length);

export default SupportPopup;
