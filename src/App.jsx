import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [entered, setEntered] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isWrong, setIsWrong] = useState(false);
  const [isHeyPageVisible, setIsHeyPageVisible] = useState(false);
  const [isLittleWorldActive, setIsLittleWorldActive] = useState(false);
  const [isHowDareActive, setIsHowDareActive] = useState(false);
  const [answerMessage, setAnswerMessage] = useState({ text: '', show: false });
  const [isBirthdayCakeActive, setIsBirthdayCakeActive] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showWishMessage, setShowWishMessage] = useState(false);

  // Tic Tac Toe Front Page State
  const [isTttPageActive, setIsTttPageActive] = useState(true);
  const [tttBoard, setTttBoard] = useState(Array(9).fill(null));
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [tttWinnerInfo, setTttWinnerInfo] = useState(null);
  const [tttStatus, setTttStatus] = useState("Your turn! Put an X in any box ♡");
  const [isUserTurn, setIsUserTurn] = useState(true);

  const correctPasskey = '2910';

  const enteredRef = useRef(entered);
  enteredRef.current = entered;

  const checkPasskey = () => {
    const currentEntered = enteredRef.current;
    if (currentEntered === correctPasskey) {
      setMessage({
        text: 'Unlocked ♡ Welcome to our little world!',
        type: 'success',
      });

      // Show the Hey!! page overlay inside the same page
      setTimeout(() => {
        setIsHeyPageVisible(true);
      }, 800);
    } else {
      setMessage({
        text: "Hmm... that's not our little secret ♡",
        type: 'error',
      });
      setIsWrong(true);

      setTimeout(() => {
        setIsWrong(false);
        setEntered('');
        setMessage({ text: '', type: '' });
      }, 650);
    }
  };

  const addNumber = (number) => {
    if (enteredRef.current.length >= 4) {
      return;
    }

    const nextEntered = enteredRef.current + number;
    setEntered(nextEntered);
    setMessage({ text: '', type: '' });

    // Automatically check after 4 digits
    if (nextEntered.length === 4) {
      if (nextEntered === correctPasskey) {
        setMessage({
          text: 'Unlocked ♡ Welcome to our little world!',
          type: 'success',
        });
        setTimeout(() => {
          setIsHeyPageVisible(true);
        }, 800);
      } else {
        setMessage({
          text: "Hmm... that's not our little secret ♡",
          type: 'error',
        });
        setIsWrong(true);

        setTimeout(() => {
          setIsWrong(false);
          setEntered('');
          setMessage({ text: '', type: '' });
        }, 650);
      }
    }
  };

  const clearPasskey = () => {
    setEntered('');
    setMessage({ text: '', type: '' });
    setIsWrong(false);
  };

  const removeLast = () => {
    setEntered((prev) => prev.slice(0, -1));
    setMessage({ text: '', type: '' });
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (/^[0-9]$/.test(event.key)) {
        addNumber(event.key);
      } else if (event.key === 'Backspace') {
        removeLast();
      } else if (event.key === 'Escape') {
        clearPasskey();
      } else if (event.key === 'Enter') {
        checkPasskey();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleUnlockClick = () => {
    checkPasskey();
  };

  const handleYes = () => {
    setIsBirthdayCakeActive(true);
    setCandlesBlown(false);
    setShowWishMessage(false);
  };

  const handleNo = () => {
    setIsHowDareActive(true);
  };

  const handleGoBack = () => {
    pauseCakeMusic();
    setIsHowDareActive(false);
    setIsHeyPageVisible(true);
    setIsLittleWorldActive(false);
    setIsBirthdayCakeActive(false);
  };

  const playKnifeShing = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume();
      const now = ctx.currentTime;
      [2400, 3600, 4800].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.02);
        gain.gain.setValueAtTime(0, now + idx * 0.02);
        gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + idx * 0.02 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.02 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.02);
        osc.stop(now + idx * 0.02 + 0.58);
      });
    } catch (e) {}
  };


  const handleLittleWorldYes = () => {
    setIsBirthdayCakeActive(true);
    setCandlesBlown(false);
    setShowWishMessage(false);
  };

  const handleLittleWorldNo = () => {
    setIsHowDareActive(true);
  };

  const triggerCelebrationBurst = () => {
    // 1. Animate side party poppers
    const poppers = document.querySelectorAll('.cake-side-popper');
    poppers.forEach((popper) => {
      popper.classList.remove('popper-blasting');
      void popper.offsetWidth;
      popper.classList.add('popper-blasting');
    });

    // 2. Animate blow button
    const blowPill = document.querySelector('.cake-blow-pill-btn');
    if (blowPill) {
      blowPill.classList.remove('blasting');
      void blowPill.offsetWidth;
      blowPill.classList.add('blasting');
    }

    // 3. Generate sparkling stars and cute popper explosion particles
    const container =
      document.getElementById('bdayParticlesReact') ||
      document.querySelector('.cake-centerpiece');
    if (!container) return;

    const stars = ['✨', '⭐', '🌟', '💫', '✦', '✧', '✨', '⭐'];
    const cuteEmojis = ['🎉', '🎊', '💖', '🎀', '🌸', '✨', '🌟'];
    const colors = [
      '#ff4081',
      '#ffd700',
      '#00e5ff',
      '#b388ff',
      '#ff9100',
      '#76ff03',
      '#ff1744',
      '#ff80ab',
    ];

    const rect = container.getBoundingClientRect();
    const width = rect.width || 380;

    // A) Left Popper blast (shoots up and right)
    for (let i = 0; i < 16; i++) {
      spawnParticle(container, {
        originX: 10,
        originY: 200,
        dx: 50 + Math.random() * 200,
        dy: -90 - Math.random() * 240,
        rot: 180 + Math.random() * 540,
        type: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'emoji' : 'confetti',
        stars,
        cuteEmojis,
        colors,
      });
    }

    // B) Right Popper blast (shoots up and left)
    for (let i = 0; i < 16; i++) {
      spawnParticle(container, {
        originX: width - 20,
        originY: 200,
        dx: -50 - Math.random() * 200,
        dy: -90 - Math.random() * 240,
        rot: -180 - Math.random() * 540,
        type: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'emoji' : 'confetti',
        stars,
        cuteEmojis,
        colors,
      });
    }

    // C) Center BLOW Button sparkle blast (360 radial star explosion)
    for (let i = 0; i < 20; i++) {
      const angle = (Math.PI * 2 * i) / 20 + (Math.random() * 0.4 - 0.2);
      const dist = 90 + Math.random() * 170;
      spawnParticle(container, {
        originX: width / 2,
        originY: 175,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 25,
        rot: (Math.random() - 0.5) * 720,
        type: i % 2 === 0 ? 'star' : i % 4 === 1 ? 'emoji' : 'confetti',
        stars,
        cuteEmojis,
        colors,
      });
    }
  };

  const spawnParticle = (container, opts) => {
    const el = document.createElement('div');
    el.className = 'burst-particle';
    el.style.left = opts.originX + 'px';
    el.style.top = opts.originY + 'px';
    el.style.setProperty('--dx', opts.dx + 'px');
    el.style.setProperty('--dy', opts.dy + 'px');
    el.style.setProperty('--rot', opts.rot + 'deg');

    if (opts.type === 'star') {
      el.classList.add('burst-star');
      el.textContent = opts.stars[Math.floor(Math.random() * opts.stars.length)];
      el.style.setProperty('--size', 18 + Math.random() * 16 + 'px');
    } else if (opts.type === 'emoji') {
      el.classList.add('burst-emoji');
      el.textContent = opts.cuteEmojis[Math.floor(Math.random() * opts.cuteEmojis.length)];
      el.style.setProperty('--size', 16 + Math.random() * 14 + 'px');
    } else {
      el.classList.add('burst-confetti');
      el.style.setProperty('--color', opts.colors[Math.floor(Math.random() * opts.colors.length)]);
      el.style.setProperty('--cw', 8 + Math.random() * 8 + 'px');
      el.style.setProperty('--ch', 10 + Math.random() * 10 + 'px');
      el.style.setProperty('--radius', Math.random() > 0.5 ? '50%' : '2px');
    }

    container.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 1850);
  };

  const cakeAudioRef = useRef(null);
  const [isCakeMusicPlaying, setIsCakeMusicPlaying] = useState(false);
  const synthTimerRef = useRef(null);
  const synthCtxRef = useRef(null);

  const playHappyBirthdaySynth = () => {
    stopHappyBirthdaySynth();
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!synthCtxRef.current || synthCtxRef.current.state === 'closed') {
        synthCtxRef.current = new AudioCtx();
      }
      if (synthCtxRef.current.state === 'suspended') {
        synthCtxRef.current.resume();
      }
    } catch (e) {
      return;
    }

    setIsCakeMusicPlaying(true);
    const ctx = synthCtxRef.current;

    const D3 = 146.83, Fs3 = 185.00, G3 = 196.00, A3 = 220.00, B3 = 246.94, C4 = 261.63;
    const D4 = 293.66, E4 = 329.63, Fs4 = 369.99, G4 = 392.00, A4 = 440.00, B4 = 493.88;
    const C5 = 523.25, D5 = 587.33, E5 = 659.25, G5 = 783.99, B5 = 987.77;

    const notes = [
      // Phrase 1: Happy Birthday to you
      { f: D4, d: 0.75 },
      { f: D4, d: 0.25 },
      { f: E4, d: 1.0, c: [G3, B3, D4] },
      { f: D4, d: 1.0 },
      { f: G4, d: 1.0, c: [D3, Fs3, A3, C4] },
      { f: Fs4, d: 2.0, c: [D3, Fs3, A3] },

      // Phrase 2: Happy Birthday to you
      { f: D4, d: 0.75 },
      { f: D4, d: 0.25 },
      { f: E4, d: 1.0, c: [D3, Fs3, C4] },
      { f: D4, d: 1.0 },
      { f: A4, d: 1.0, c: [G3, B3, D4] },
      { f: G4, d: 2.0, c: [G3, B3, D4] },

      // Phrase 3: Happy Birthday dear ...
      { f: D4, d: 0.75 },
      { f: D4, d: 0.25 },
      { f: D5, d: 1.0, c: [G3, B3, D4, Fs4] },
      { f: B4, d: 1.0 },
      { f: G4, d: 1.0, c: [C4, E4, G4] },
      { f: Fs4, d: 1.0 },
      { f: E4, d: 2.0, c: [C4, E4, G4] },

      // Phrase 4: Happy Birthday to you!
      { f: C5, d: 0.75 },
      { f: C5, d: 0.25 },
      { f: B4, d: 1.0, c: [G3, B3, D4] },
      { f: G4, d: 1.0 },
      { f: A4, d: 1.0, c: [D3, Fs3, A3, C4] },
      { f: G4, d: 2.4, c: [G3, B3, D4, G4] },

      // Shimmering Bell Flourish Outro
      { f: B4, d: 0.4 },
      { f: D5, d: 0.4 },
      { f: G5, d: 0.4 },
      { f: B5, d: 2.2, c: [G3, D4, G4, B4, D5] },
    ];

    const beatDuration = 0.55;
    const currentTime = ctx.currentTime + 0.05;

    function playChime(freq, startTime, duration, vol) {
      if (!ctx || ctx.state === 'closed') return;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, startTime);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, startTime);

      gain1.gain.setValueAtTime(0.001, startTime);
      gain1.gain.linearRampToValueAtTime(vol, startTime + 0.015);
      gain1.gain.exponentialRampToValueAtTime(0.0001, startTime + duration + 0.6);

      gain2.gain.setValueAtTime(0.001, startTime);
      gain2.gain.linearRampToValueAtTime(vol * 0.4, startTime + 0.01);
      gain2.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.8 + 0.3);

      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.7);
      osc2.stop(startTime + duration + 0.4);
    }

    let noteOffset = 0;
    notes.forEach((item) => {
      const noteStart = currentTime + noteOffset;
      const noteLen = item.d * beatDuration;
      playChime(item.f, noteStart, noteLen, 0.22);
      if (item.c) {
        item.c.forEach((cFreq) => {
          playChime(cFreq, noteStart, noteLen * 1.2, 0.08);
        });
      }
      noteOffset += noteLen;
    });

    const loopDelayMs = (noteOffset + 1.8) * 1000;
    synthTimerRef.current = setTimeout(() => {
      playHappyBirthdaySynth();
    }, loopDelayMs);
  };

  const stopHappyBirthdaySynth = () => {
    if (synthTimerRef.current) {
      clearTimeout(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  };

  const playCakeMusic = () => {
    if (cakeAudioRef.current) {
      cakeAudioRef.current.currentTime = 0;
      const p = cakeAudioRef.current.play();
      if (p !== undefined) {
        p.then(() => {
          setIsCakeMusicPlaying(true);
        }).catch((err) => {
          console.warn('React audio play fallback:', err);
          playHappyBirthdaySynth();
        });
      }
    } else {
      playHappyBirthdaySynth();
    }
  };

  const pauseCakeMusic = () => {
    if (cakeAudioRef.current) {
      try { cakeAudioRef.current.pause(); } catch (e) {}
    }
    stopHappyBirthdaySynth();
    setIsCakeMusicPlaying(false);
  };

  const toggleCakeMusic = () => {
    if (isCakeMusicPlaying) {
      pauseCakeMusic();
    } else {
      playCakeMusic();
    }
  };

  const toggleCandles = () => {
    setCandlesBlown((prev) => {
      const next = !prev;
      if (next) {
        setShowWishMessage(true);
        triggerCelebrationBurst();
        playCakeMusic();
      } else {
        pauseCakeMusic();
      }
      return next;
    });
  };

  const handleBlowBtnClick = () => {
    if (!candlesBlown) {
      toggleCandles();
    } else {
      triggerCelebrationBurst();
      playCakeMusic();
    }
  };

  const handleBirthdayBack = () => {
    pauseCakeMusic();
    setIsBirthdayCakeActive(false);
    setIsHeyPageVisible(true);
  };

  const WINNING_COMBOS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinnerState = (board) => {
    for (let combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], combo };
      }
    }
    if (board.every(cell => cell !== null)) {
      return { winner: 'tie', combo: null };
    }
    return null;
  };

  const handleTttCellClick = (index) => {
    if (tttWinnerInfo || isAiThinking || tttBoard[index] !== null) return;

    const newBoard = [...tttBoard];
    newBoard[index] = 'X';
    setTttBoard(newBoard);

    const res = checkWinnerState(newBoard);
    if (res) {
      setTttWinnerInfo(res);
      if (res.winner === 'X') {
        setTttStatus('You won my heart! 💖 Tap next to continue ♡');
      } else {
        setTttStatus("It's a tie! But you still win my heart ♡");
      }
      return;
    }

    setIsAiThinking(true);
    setIsUserTurn(false);
    setTttStatus('Thinking... 💭');

    setTimeout(() => {
      const available = [];
      newBoard.forEach((val, i) => {
        if (val === null) available.push(i);
      });
      if (available.length > 0) {
        // Find player's winning moves
        const winningMovesForPlayer = [];
        for (let idx of available) {
          const test = [...newBoard];
          test[idx] = 'X';
          if (checkWinnerState(test)?.winner === 'X') {
            winningMovesForPlayer.push(idx);
          }
        }

        // 1. NEVER block the player's 3rd spot!
        let safeAvailable = available.filter(idx => !winningMovesForPlayer.includes(idx));
        if (safeAvailable.length === 0) safeAvailable = available;

        // 2. NEVER let AI win!
        const nonWinningMovesForAi = safeAvailable.filter(idx => {
          const test = [...newBoard];
          test[idx] = 'O';
          return checkWinnerState(test)?.winner !== 'O';
        });

        const pool = nonWinningMovesForAi.length > 0 ? nonWinningMovesForAi : safeAvailable;

        // 3. Keep player's active lines completely open and unobstructed
        const playerIndices = [];
        newBoard.forEach((val, i) => {
          if (val === 'X') playerIndices.push(i);
        });

        const openPlayerLines = WINNING_COMBOS.filter(combo => {
          return combo.some(idx => playerIndices.includes(idx)) &&
                 !combo.some(idx => newBoard[idx] === 'O');
        });

        const preferredMoves = pool.filter(idx => {
          return !openPlayerLines.some(combo => combo.includes(idx));
        });

        const move = preferredMoves.length > 0
          ? preferredMoves[Math.floor(Math.random() * preferredMoves.length)]
          : pool[Math.floor(Math.random() * pool.length)];

        newBoard[move] = 'O';
        setTttBoard(newBoard);

        const aiRes = checkWinnerState(newBoard);
        if (aiRes) {
          setTttWinnerInfo(aiRes);
          if (aiRes.winner === 'O') {
            setTttStatus('I got this round! Tap restart or click next ♡');
          } else {
            setTttStatus("It's a tie! But you still win my heart ♡");
          }
        } else {
          setTttStatus('Your turn! Put an X in any box ♡');
          setIsUserTurn(true);
        }
      }
      setIsAiThinking(false);
    }, 420);
  };

  const handleTttRestart = () => {
    setTttBoard(Array(9).fill(null));
    setTttWinnerInfo(null);
    setIsAiThinking(false);
    setIsUserTurn(true);
    setTttStatus('Your turn! Put an X in any box ♡');
  };

  const handleTttNext = () => {
    setIsTttPageActive(false);
  };

  return (
    <>
      {/* =====================================================
           FRONT PAGE: ROMANTIC TIC TAC TOE MINI-GAME
           ===================================================== */}
      {isTttPageActive && (
        <section id="tictactoePage" className="tictactoe-page" aria-label="Tic Tac Toe Game">
          <div className="ttt-ambient-glow"></div>
          <div className="ttt-orb ttt-orb-1"></div>
          <div className="ttt-orb ttt-orb-2"></div>
          <div className="ttt-orb ttt-orb-3"></div>

          <div className="ttt-symbols-layer" aria-hidden="true">
            <span className="ttt-floating-symbol sym-1">✦</span>
            <span className="ttt-floating-symbol sym-2">♡</span>
            <span className="ttt-floating-symbol sym-3">✿</span>
            <span className="ttt-floating-symbol sym-4">★</span>
            <span className="ttt-floating-symbol sym-5">୨୧</span>
            <span className="ttt-floating-symbol sym-6">✧</span>
            <span className="ttt-floating-symbol sym-7">♥</span>
            <span className="ttt-floating-symbol sym-8">🌸</span>
            <span className="ttt-floating-symbol sym-9">ʚɞ</span>
            <span className="ttt-floating-symbol sym-10">✨</span>
            <span className="ttt-floating-symbol sym-11">♡</span>
            <span className="ttt-floating-symbol sym-12">❀</span>
            <span className="ttt-floating-symbol sym-13">💕</span>
            <span className="ttt-floating-symbol sym-14">✦</span>
            <span className="ttt-floating-symbol sym-15">🌷</span>
          </div>

          <div className="ttt-container">
            <div className="ttt-header">
              <div className="ttt-sparkle-badge">
                <span className="ttt-badge-icon">୨୧</span>
                <span>play with me ♡</span>
                <span className="ttt-badge-icon">୨୧</span>
              </div>
              <h1 className="ttt-title">Tic Tac Toe</h1>
              <p className="ttt-subtitle" id="tttStatusText">
                {tttStatus}
              </p>
            </div>

            <div className="ttt-board-card">
              <div className="ttt-board" id="tttBoard" role="grid" aria-label="Tic Tac Toe Board">
                {tttBoard.map((val, idx) => {
                  const isWinning = tttWinnerInfo?.combo?.includes(idx);
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`ttt-cell ${val === 'X' ? 'cell-x' : val === 'O' ? 'cell-o' : ''} ${isWinning ? 'winning-cell' : ''}`.trim()}
                      onClick={() => handleTttCellClick(idx)}
                      aria-label={`Box ${idx + 1}`}
                    >
                      {val === 'X' && <span className="ttt-symbol symbol-x">X</span>}
                      {val === 'O' && <span className="ttt-symbol symbol-o">O</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="ttt-turn-indicator">
              <span className={`ttt-player-tag tag-user ${isUserTurn ? 'active' : ''}`.trim()} id="tttUserTag">
                <span className="ttt-tag-avatar">X</span> You
              </span>
              <span className="ttt-vs-heart">♥</span>
              <span className={`ttt-player-tag tag-ai ${!isUserTurn ? 'active' : ''}`.trim()} id="tttAiTag">
                <span className="ttt-tag-avatar">O</span> Me
              </span>
            </div>

            <div className="ttt-actions">
              <button
                type="button"
                className="ttt-btn ttt-btn-restart"
                id="tttRestartBtn"
                onClick={handleTttRestart}
                title="Restart game"
              >
                <span className="restart-badge">↻</span> Restart
              </button>
              <button
                type="button"
                className={`ttt-btn ttt-btn-next ${tttWinnerInfo ? 'pulse-highlight' : ''}`.trim()}
                id="tttNextBtn"
                onClick={handleTttNext}
                title="Continue to next page"
              >
                next
              </button>
            </div>

            <div className="ttt-footer-note">
              <span>♡ a little fun before our secret ♡</span>
            </div>
          </div>
        </section>
      )}

      <main className={`page ${isTttPageActive ? 'behind-ttt' : ''}`}>
        {/* =========================
             LEFT PHOTO SECTION
        ========================== */}
        <section className="photo-side">
          {/* Cute decorations */}
          <div className="sparkle sparkle-1">✦</div>
          <div className="sparkle sparkle-2">✧</div>
          <div className="sparkle sparkle-3">★</div>
          <div className="sparkle sparkle-4">♡</div>
          <div className="sparkle sparkle-5">✿</div>
          <div className="sparkle sparkle-6">♥</div>
          <div className="sparkle sparkle-7">✧</div>

          <div className="little-note note-1">♡</div>
          <div className="little-note note-2">୨୧</div>
          <div className="little-note note-3">ꕤ</div>

          {/* Circular photo */}
          <div className="photo-wrap">
            <div className="photo-ring ring-outer"></div>
            <div className="photo-ring ring-middle"></div>

            <div className="photo-frame">
              <img src="/assets/our-photo.jpeg" alt="A photo of us" />
            </div>

            {/* Hearts around photo */}
            <span className="heart heart-a">♥</span>
            <span className="heart heart-b">♥</span>
            <span className="heart heart-c">♡</span>
            <span className="heart heart-d">♡</span>

            {/* Flowers */}
            <span className="flower flower-a">✿</span>
            <span className="flower flower-b">❀</span>
          </div>

          {/* Caption */}
          <div className="photo-caption">
            <span>just us</span>
            <small>♡ a tiny piece of our world ♡</small>
          </div>
        </section>

        {/* =========================
             RIGHT PASSKEY SECTION
        ========================== */}
        <section className="passkey-side">
          <div className="rose-orb orb-1"></div>
          <div className="rose-orb orb-2"></div>

          <div className="passkey-card">
            <div className="mini-heart">♥</div>

            <p className="eyebrow">a little secret</p>

            <h1>Enter your passkey</h1>

            <p className="subtitle">Only the two of us know this ♡</p>

            {/* Four passkey boxes */}
            <div className="passcode-display">
              {[0, 1, 2, 3].map((index) => {
                const isFilled = index < entered.length;
                const isActive = index === entered.length && entered.length < 4;
                const classes = [
                  'pass-box',
                  isFilled ? 'filled' : '',
                  isActive ? 'active' : '',
                  isWrong ? 'wrong' : '',
                ]
                  .filter(Boolean)
                  .join(' ');

                return <div key={index} className={classes}></div>;
              })}
            </div>

            <p className="key-hint">tap the numbers below</p>

            {/* NUMBER KEYPAD */}
            <div className="keypad">
              <button className="key" data-key="1" onClick={() => addNumber('1')}>
                1
              </button>
              <button className="key" data-key="2" onClick={() => addNumber('2')}>
                2
              </button>
              <button className="key" data-key="3" onClick={() => addNumber('3')}>
                3
              </button>

              <button className="key" data-key="4" onClick={() => addNumber('4')}>
                4
              </button>
              <button className="key" data-key="5" onClick={() => addNumber('5')}>
                5
              </button>
              <button className="key" data-key="6" onClick={() => addNumber('6')}>
                6
              </button>

              <button className="key" data-key="7" onClick={() => addNumber('7')}>
                7
              </button>
              <button className="key" data-key="8" onClick={() => addNumber('8')}>
                8
              </button>
              <button className="key" data-key="9" onClick={() => addNumber('9')}>
                9
              </button>

              <button className="key special" data-key="clear" onClick={clearPasskey}>
                ×
              </button>
              <button className="key" data-key="0" onClick={() => addNumber('0')}>
                0
              </button>
              <button className="key special" data-key="backspace" onClick={removeLast}>
                ⌫
              </button>
            </div>

            {/* Unlock button */}
            <button className="unlock-btn" id="unlockBtn" onClick={handleUnlockClick}>
              unlock our little world ♡
            </button>

            {/* Message */}
            <p
              className={`message ${message.type ? message.type : ''}`.trim()}
              id="message"
            >
              {message.text}
            </p>

            {/* Back to Tic Tac Toe button */}
            <button
              type="button"
              className="back-to-ttt-btn"
              onClick={() => setIsTttPageActive(true)}
            >
              <span>🌸</span> Play Tic Tac Toe again
            </button>
          </div>

          {/* Decorations */}
          <div className="side-decoration deco-1">✦</div>
          <div className="side-decoration deco-2">♡</div>
          <div className="side-decoration deco-3">✧</div>
          <div className="side-decoration deco-4">♥</div>
        </section>
      </main>

      {/* =====================================================
           HEY PAGE – shown after correct passkey is entered
           ===================================================== */}
      <div className={`hey-page ${isHeyPageVisible ? 'visible' : ''}`.trim()} id="heyPage">
        {/* Ambient Dreamy Aurora & Film Grain Wallpaper */}
        <div className="hey-aurora"></div>
        <div className="hey-grain"></div>

        {/* Floating Scrapbook Tags & Charms */}
        <div className="hey-floating-tag tag-1">୨୧ surprise ୨୧</div>
        <div className="hey-floating-tag tag-2">✦ chapter 21 ✦</div>

        {/* Floating Background Pastel Decos */}
        <div className="bg-deco deco-star-1">✦</div>
        <div className="bg-deco deco-star-2">✧</div>
        <div className="bg-deco deco-star-3">★</div>
        <div className="bg-deco deco-star-4">✧</div>
        <div className="bg-deco deco-heart-1">♡</div>
        <div className="bg-deco deco-heart-2">♥</div>
        <div className="bg-deco deco-heart-3">♡</div>
        <div className="bg-deco deco-flower-1">✿</div>
        <div className="bg-deco deco-flower-2">❀</div>
        <div className="bg-deco deco-bow">୨୧</div>
        <div className="bg-deco deco-sparkle-1">✦</div>
        <div className="bg-deco deco-sparkle-2">★</div>

        {/* Cohesive Side-by-Side Scrapbook Stage */}
        <div className="hey-stage">
          {/* Main Scrapbook Card */}
          <main className="hey-card">
            {/* Cute Washi Tape Accents */}
            <div className="hey-washi washi-left"></div>
            <div className="hey-washi washi-right"></div>

            {/* Ribbon Sticker */}
            <div className="hey-ribbon-badge">୨୧</div>

            {/* Eyebrow Tag */}
            <span className="hey-eyebrow">⋆ ｡˚ a little surprise for you ｡˚ ⋆</span>

            {/* Title HEY!! */}
            <h1 className="hey-title">HEY!!</h1>

            {/* Subtitle */}
            <p className="hey-sub">I made something special for you</p>

            {/* Question */}
            <p className="hey-q">do you want to see? ♡</p>

            <div className="hey-divider">
              <span>✦</span>
              <span>♡</span>
              <span>✿</span>
              <span>♡</span>
              <span>✦</span>
            </div>

            {/* Interactive Yes / No Buttons */}
            <div className="btn-group">
              <button type="button" className="hey-btn btn-yes" onClick={handleYes}>
                <span>✨</span> Yes, show me!
              </button>
              <button type="button" className="hey-btn btn-no" onClick={handleNo}>
                No 🥺
              </button>
            </div>

            {/* Cute Card Stamped Footer */}
            <div className="card-symbols bottom-symbols">
              <span>«</span>
              <span>୨୧ made with love for you ୨୧</span>
              <span>»</span>
            </div>
          </main>

          {/* Cute Upside-Down Hanging Spidey Companion with Scrapbook Ribbon & Web */}
          <div className="spidey-wrap" title="Tap Spidey for a cute message! ♡">
            {/* Scrapbook Web Anchor with Washi Tape & Bow */}
            <div className="spidey-hanger-anchor">
              <div className="spidey-washi-tape"></div>
              <div className="spidey-bow-pin">୨୧</div>
              <div className="spidey-silk-web-line"></div>
            </div>

            {/* Pendulum Rig that Swings from the Web Anchor */}
            <div className="spidey-pendulum-rig">
              {/* Spidey Character Frame */}
              <div className="spidey-frame" title="Your friendly neighborhood sweetheart ♡">
                <img src="/assets/spidey/spidey_hanging.png" alt="Cute Upside-Down Hanging Spider-Man" className="spidey-img" />
                <div className="spidey-heart-pulse">💗</div>
              </div>

              {/* Scrapbook Speech Bubble below upside-down face */}
              <div className="spidey-speech-bubble">
                <span className="speech-sparkle">✦</span>
                <span>wait till you see it! ୨୧</span>
                <span className="speech-sparkle">✦</span>
              </div>

              {/* Floating Ambient Hearts */}
              <span className="spidey-heart sh-1">♥</span>
              <span className="spidey-heart sh-2">♡</span>
              <span className="spidey-heart sh-3">✨</span>
              <span className="spidey-heart sh-4">💕</span>
            </div>

            {/* Isolated Layer for Tap Sparkles */}
            <div className="spidey-hearts-layer" id="spideyHeartsLayer"></div>
          </div>
        </div>
      </div>

      {/* =====================================================
           OUR LITTLE WORLD PAGE
           ===================================================== */}
      <section
        id="littleWorldPage"
        className={`little-world-page ${isLittleWorldActive ? 'active' : ''}`.trim()}
      >
        {/* LEFT WHITE BOX */}
        <div className="little-world-card">
          <div className="little-world-content">
            <div className="little-world-top-symbols">✦ ♡ ✦</div>

            <h1 className="hey-title">HEY!!</h1>

            <h2 className="made-title">I made something for you</h2>

            <p className="see-question">Do you want to see!!</p>

            <div className="little-world-symbols">♡ ✿ ♡</div>

            <div className="answer-buttons">
              <button
                type="button"
                id="yesButton"
                className="answer-btn yes-button"
                onClick={handleLittleWorldYes}
              >
                Yes
              </button>

              <button
                type="button"
                id="noButton"
                className="answer-btn no-button"
                onClick={handleLittleWorldNo}
              >
                No
              </button>
            </div>

            <p
              id="answerMessage"
              className={`answer-message ${answerMessage.show ? 'show' : ''}`.trim()}
            >
              {answerMessage.text}
            </p>
          </div>
        </div>

        {/* BIG SPIDER-MAN — SEPARATE FROM THE BOX */}
        <div className="spiderman-photo">
          <img src="/assets/spiderman.jpg" alt="Cute Spider-Man" />
        </div>

        {/* CUTE DECORATIONS */}
        <div className="cute-heart heart-one">♥</div>
        <div className="cute-heart heart-two">♥</div>
        <div className="cute-heart heart-three">♥</div>

        <div className="cute-sparkle sparkle-one">✦</div>
        <div className="cute-sparkle sparkle-two">✧</div>
        <div className="cute-sparkle sparkle-three">✦</div>

        <div className="cute-star star-one">♡</div>
        <div className="cute-star star-two">♡</div>

        <div className="cute-plus plus-one">+</div>
        <div className="cute-plus plus-two">+</div>
      </section>

      {/* ================================
           HEY, I HAVE A SURPRISE PAGE
      ================================ */}
      <section id="surprisePage" className="surprise-page">
        <div className="surprise-decoration surprise-star-1">✦</div>
        <div className="surprise-decoration surprise-star-2">✧</div>
        <div className="surprise-decoration surprise-heart-1">♡</div>
        <div className="surprise-decoration surprise-heart-2">♥</div>
        <div className="surprise-decoration surprise-flower">✿</div>

        <div className="surprise-card">
          <div className="surprise-main-heart">♡</div>

          <p className="surprise-small-title">A LITTLE SOMETHING FOR YOU</p>

          <h1>Hey, I have a surprise for you 💌</h1>

          <p className="surprise-text">
            I made something special for you...
            <br />
            but you'll have to unlock it first ♡
          </p>

          <button id="openSurpriseButton" className="open-surprise-button" type="button">
            Open My Surprise ♡
          </button>

          <p className="surprise-bottom-text">pssst... you know what to do 🤭</p>
        </div>
      </section>

      {/* =====================================================
           HOW DARE YOU PAGE
           ===================================================== */}
      <section
        id="howDarePage"
        className={`how-dare-page ${isHowDareActive ? 'active' : ''}`.trim()}
      >
        {/* Cute background decorations */}
        <div className="dare-deco dare-star dare-star-1">✦</div>
        <div className="dare-deco dare-star dare-star-2">✦</div>

        <div className="dare-deco dare-heart dare-heart-1">♡</div>
        <div className="dare-deco dare-heart dare-heart-2">♥</div>
        <div className="dare-deco dare-heart dare-heart-3">♡</div>

        <div className="dare-deco dare-paw dare-paw-1">🐾</div>
        <div className="dare-deco dare-paw dare-paw-2">🐾</div>

        <div className="dare-deco dare-sparkle dare-sparkle-1">✧</div>
        <div className="dare-deco dare-sparkle dare-sparkle-2">✦</div>

        <div className="dare-deco dare-angry dare-angry-1">💢</div>
        <div className="dare-deco dare-angry dare-angry-2">💢</div>

        {/* Main cream paper */}
        <div className="how-dare-paper">
          {/* Angry puppy */}
          <div className="angry-puppy">
            <img src="/assets/angry-dog.jpg" alt="Angry cute puppy" />
          </div>

          {/* Main content */}
          <div className="how-dare-content">
            {/* Small decorations above heading */}
            <div className="dare-top-symbols">✦ ♡ ✦</div>

            {/* Main heading */}
            <h1 className="how-dare-title">
              <span className="dare-title-text">HOW DARE YOU</span>
              <span className="knife-symbol" id="dareKnifeSymbol">🔪</span>
            </h1>

            {/* Small cute line */}
            <div className="dare-middle-symbols">♡ ✿ ♡</div>

            {/* Go Back button */}
            <button
              id="goBackButton"
              className="go-back-button"
              type="button"
              onClick={handleGoBack}
            >
              GO BACK 😡
            </button>

            {/* Bottom decorations */}
            <div className="dare-bottom-symbols">✦ ♥ 🐾 ♥ ✦</div>
          </div>
        </div>
      </section>

      {/* =====================================================
           BIRTHDAY 3-STAGE MARVEL CAKE PAGE
           ===================================================== */}
      <section
        id="birthdayCakePage"
        className={isBirthdayCakeActive ? 'active' : ''}
      >
        {/* Floating background decorations matching site theme */}
        <div className="bday-deco bday-deco-1">✦</div>
        <div className="bday-deco bday-deco-2">♡</div>
        <div className="bday-deco bday-deco-3">✧</div>
        <div className="bday-deco bday-deco-4">🎀</div>
        <div className="bday-deco bday-deco-5">♥</div>
        <div className="bday-deco bday-deco-6">🍒</div>
        <div className="bday-deco bday-deco-7">✨</div>
        <div className="bday-deco bday-deco-8">🍓</div>
        <div className="bday-deco bday-deco-9">★</div>
        <div className="bday-deco bday-deco-10">୨୧</div>
        <div className="bday-deco bday-deco-11">🎂</div>
        <div className="bday-deco bday-deco-12">🍰</div>

        {/* Floating Confetti Layer (Cherry, Gold, Rose, Cream) */}
        <div className="confetti-layer">
          {[
            { left: '5%', bg: '#e11d48', delay: '0s', dur: '3.5s' },
            { left: '12%', bg: '#ffd700', delay: '1.2s', dur: '4.2s' },
            { left: '20%', bg: '#be123c', delay: '0.4s', dur: '3.8s' },
            { left: '28%', bg: '#fda4af', delay: '2s', dur: '4.5s' },
            { left: '35%', bg: '#fbbf24', delay: '0.8s', dur: '3.2s' },
            { left: '42%', bg: '#9f1239', delay: '1.6s', dur: '4s' },
            { left: '50%', bg: '#fff1f2', delay: '0.2s', dur: '3.6s' },
            { left: '58%', bg: '#e11d48', delay: '2.4s', dur: '4.1s' },
            { left: '65%', bg: '#ffd700', delay: '1s', dur: '3.9s' },
            { left: '72%', bg: '#f43f5e', delay: '0.5s', dur: '4.3s' },
            { left: '80%', bg: '#be123c', delay: '1.8s', dur: '3.4s' },
            { left: '88%', bg: '#fbbf24', delay: '0.9s', dur: '4.6s' },
            { left: '94%', bg: '#fda4af', delay: '2.1s', dur: '3.7s' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="confetti-piece"
              style={{
                left: item.left,
                backgroundColor: item.bg,
                animationDelay: item.delay,
                animationDuration: item.dur,
              }}
            />
          ))}
        </div>

        {/* Center Birthday Content */}
        <div className="bday-content">
          <header className="bday-header">
            <div className="bday-symbols-top">✦ ♡ ✦</div>
            <h1 className="bday-title">Happiiiieeeeee Birthday!! 🎀✨</h1>
          </header>

          {/* Classic Birthday Audio (Plays invisibly in background on blow) */}
          <audio ref={cakeAudioRef} loop preload="auto">
            <source src="assets/classic_happy_birthday.wav" type="audio/wav" />
            <source src="public/classic_happy_birthday.wav" type="audio/wav" />
          </audio>


          {/* CUTE CARTOON 2-TIER BIRTHDAY CAKE */}
          <div className="cake-centerpiece">
            {/* "Make a wish" above the candles matching reference photo */}
            <div className="make-a-wish-text">
              Make a wish ✨
            </div>

            <div className="cute-cake-assembly">
              {/* Row of 7 Candles like reference photo */}
              <div className="cake-candles-row">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <div
                    key={num}
                    className={`cake-candle candle-${num} ${candlesBlown ? 'blown-out' : ''}`}
                    onClick={toggleCandles}
                    title="Click to blow out candle!"
                  >
                    <div className="candle-flame"></div>
                    <div className="candle-smoke"></div>
                    <div className="candle-wick"></div>
                    <div className="candle-stick"></div>
                  </div>
                ))}
              </div>

              {/* TOP CAKE TIER (Red Velvet Cherry Glaze with whipped cream drips) */}
              <div className="cake-tier-top">
                {/* Whipped cream scalloped frosting drips */}
                <svg className="tier-top-frosting" viewBox="0 0 250 54" preserveAspectRatio="none">
                  <path
                    d="M 0 0 L 250 0 L 250 24 C 242 24 238 46 230 46 C 222 46 218 22 210 22 C 202 22 196 50 186 50 C 176 50 172 24 164 24 C 156 24 150 48 140 48 C 130 48 126 22 118 22 C 110 22 104 52 94 52 C 84 52 80 24 72 24 C 64 24 58 48 48 48 C 38 48 34 22 26 22 C 18 22 12 44 0 44 Z"
                    fill="#ffffff"
                  />
                </svg>

                {/* Subtle texture sprinkles */}
                <div className="cake-texture-dots"></div>
              </div>

              {/* BOTTOM CAKE TIER (Wider Red Velvet Cherry Glaze with frosting drip & Cherry BLOW pill button) */}
              <div className="cake-tier-bottom">
                {/* Whipped cream scalloped frosting drips */}
                <svg className="tier-bottom-frosting" viewBox="0 0 340 56" preserveAspectRatio="none">
                  <path
                    d="M 0 0 L 340 0 L 340 26 C 330 26 324 50 314 50 C 304 50 298 24 288 24 C 278 24 270 52 258 52 C 246 52 240 22 230 22 C 220 22 212 50 200 50 C 188 50 182 24 170 24 C 158 24 150 54 138 54 C 126 54 120 22 108 22 C 96 22 88 52 76 52 C 64 52 58 24 46 24 C 34 24 26 48 14 48 C 6 48 2 30 0 30 Z"
                    fill="#ffffff"
                  />
                </svg>

                {/* Subtle texture sprinkles */}
                <div className="cake-texture-dots"></div>

                {/* BLOW Button in center of tier - matching reference photo */}
                <button
                  type="button"
                  className="cake-blow-pill-btn"
                  onClick={handleBlowBtnClick}
                  title="Click to blow out the candles!"
                >
                  BLOW
                </button>
              </div>

                {/* Side Party Poppers flanking the cake */}
                <div className="cake-side-popper popper-left" title="Party Popper!">🎉</div>
                <div className="cake-side-popper popper-right" title="Party Popper!">🎉</div>

                {/* Cake Stand / Plate */}
                <div className="cake-plate"></div>
              </div>

              {/* Sparkling Stars & Confetti Particles Container */}
              <div className="bday-particles-container" id="bdayParticlesReact"></div>
            </div>

          {/* Interactive Wish Toast */}
          <div className={`wish-toast ${showWishMessage ? 'show' : ''}`}>
            <p>✨ Wish made! Happiiiieeeeee Birthday behen ki pakodi! Stay blessed & happy always ♡ 🎂💖</p>
          </div>

          {/* Action Buttons */}
          <div className="bday-actions">
            <button
              type="button"
              className="bday-btn btn-blow-candles"
              onClick={toggleCandles}
            >
              {candlesBlown ? '🕯️ Relight Candles' : '🎂 Blow Candles / Make a Wish'}
            </button>
            <button
              type="button"
              className="bday-btn btn-bday-back"
              onClick={handleBirthdayBack}
            >
              ← Go Back
            </button>
          </div>

          {/* Decorative Footer Symbols */}
          <div className="bday-footer-symbols">
            ✦ 💖 🎀 ✧ 🌸 🎂 💖 ✦
          </div>
        </div>

      </section>
    </>
  );
}

