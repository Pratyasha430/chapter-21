import numpy as np
import scipy.signal as signal
import scipy.io.wavfile as wavfile
import os

SAMPLE_RATE = 44100

def create_glottal_pulse_train(t, f0_contour):
    """
    Synthesize natural glottal pulses (Liljencrants-Fant / Rosenberg approximation)
    following a pitch contour f0(t).
    """
    phase = np.cumsum(f0_contour / SAMPLE_RATE) % 1.0
    
    # Rosenberg glottal pulse shape: 3*(p/tp)^2 - 2*(p/tp)^3 for p < tp, else 0
    tp = 0.42 # open quotient
    pulses = np.zeros_like(t)
    open_idx = phase < tp
    p = phase[open_idx] / tp
    pulses[open_idx] = 3.0 * (p**2) - 2.0 * (p**3)
    
    # Add gentle vocal fold roughness / jitter (random micro pitch perturbation)
    jitter = np.random.normal(0, 0.03, size=len(t))
    pulses = pulses + 0.05 * jitter
    return pulses

def apply_formants(signal_in, formants, bw_list=[80, 110, 150]):
    """
    Apply vocal tract formant resonances via 2nd order biquad filters.
    """
    output = np.zeros_like(signal_in)
    for f, bw in zip(formants, bw_list):
        # 2nd order peak filter
        Q = f / bw
        b, a = signal.iirpeak(f, Q, fs=SAMPLE_RATE)
        filtered = signal.lfilter(b, a, signal_in)
        output += filtered
    return output

def generate_hmph_1():
    """
    1. Classic Cartoon Indignant 'Hmph! 😤'
    Vocal aspiration ('H-'), indignant pitch rise then drop ('-mm-'), followed by plosive lip release ('-ph!')
    """
    dur = 0.38
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), endpoint=False)
    
    # Pitch contour: 185 Hz -> 215 Hz -> 135 Hz
    f0 = 185.0 + 35.0 * np.sin(np.pi * t / dur) - 50.0 * (t / dur)**1.4
    
    # Glottal source
    glottal = create_glottal_pulse_train(t, f0)
    
    # Formants for 'mm' nasal pout: F1=320, F2=1150, F3=2300
    vocal = apply_formants(glottal, [320, 1150, 2300], [70, 120, 160])
    
    # Envelope for voiced segment: rises at 0.04s, sustains, cuts at 0.28s
    voice_env = np.zeros_like(t)
    v_mask = (t >= 0.03) & (t <= 0.28)
    vt = t[v_mask] - 0.03
    voice_env[v_mask] = np.sin(np.pi * vt / 0.25)**0.85
    vocal = vocal * voice_env
    
    # Aspirated onset breath 'Hh' (0.00 to 0.08s)
    noise = np.random.normal(0, 1, size=len(t))
    b_h, a_h = signal.butter(3, [500 / (SAMPLE_RATE/2), 2400 / (SAMPLE_RATE/2)], btype='band')
    h_noise = signal.lfilter(b_h, a_h, noise)
    h_env = np.exp(-((t - 0.035)/0.025)**2)
    
    # Plosive release 'ph!' (0.26 to 0.38s)
    b_p, a_p = signal.butter(2, [300 / (SAMPLE_RATE/2), 3500 / (SAMPLE_RATE/2)], btype='band')
    p_noise = signal.lfilter(b_p, a_p, noise)
    p_env = np.exp(-((t - 0.29)/0.04)**2) * (t >= 0.26)
    
    combined = 1.0 * vocal + 0.35 * h_noise * h_env + 0.45 * p_noise * p_env
    
    # Master lowpass to keep it soft, warm and non-harsh
    b_master, a_master = signal.butter(3, 3800 / (SAMPLE_RATE/2), btype='low')
    combined = signal.lfilter(b_master, a_master, combined)
    
    # Normalize
    combined = combined / (np.max(np.abs(combined)) + 1e-6) * 0.92
    return combined

def generate_grump_wah_2():
    """
    2. Comical Cartoon Grump Wah / Muted Trombone ('Whaa-hrrmph! 🎺')
    Classic cartoon comedic pout with muted formant swell.
    """
    dur = 0.42
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), endpoint=False)
    
    # Pitch drops from 165 down to 105 Hz
    f0 = 165.0 - 60.0 * (t / dur)**1.2
    
    # Rich brassy/buzzy cartoon harmonics
    glottal = create_glottal_pulse_train(t, f0)
    # Add slight subharmonic octave for chestiness
    sub = np.sin(2 * np.pi * (f0 / 2) * t) * 0.3
    raw = glottal + sub
    
    # Plunger mute effect: Formants start closed (450Hz), open up (780Hz), then drop into muffled pout (340Hz)
    f_sweep = 420.0 + 360.0 * np.sin(np.pi * t / dur)
    # Filter with dynamic peaking
    filtered = np.zeros_like(raw)
    # Block processing for time-varying formant
    block_size = 128
    for i in range(0, len(raw), block_size):
        block = raw[i:i+block_size]
        cf = f_sweep[min(i, len(f_sweep)-1)]
        b, a = signal.iirpeak(cf, cf / 90.0, fs=SAMPLE_RATE)
        filtered[i:i+block_size] = signal.lfilter(b, a, block)
    
    # Envelope: gentle attack, sustain, soft fadeout
    env = np.sin(np.pi * (t / dur)**0.7)**1.2
    sound = filtered * env
    
    # Soft end-huff
    noise = np.random.normal(0, 1, size=len(t))
    b_n, a_n = signal.butter(2, [250 / (SAMPLE_RATE/2), 1800 / (SAMPLE_RATE/2)], btype='band')
    puff = signal.lfilter(b_n, a_n, noise) * np.exp(-((t - 0.36)/0.035)**2) * (t >= 0.30)
    
    combined = sound + 0.3 * puff
    combined = combined / (np.max(np.abs(combined)) + 1e-6) * 0.90
    return combined

def generate_cute_pout_3():
    """
    3. Cute Mascot Pout / Huff ('Mmph! 🥺😤')
    Higher, adorable anime-style pout with cheek puff.
    """
    dur = 0.32
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), endpoint=False)
    
    # Pitch: 245 Hz with quick indignant drop to 160 Hz
    f0 = 245.0 - 85.0 * (t / dur)**1.1
    
    glottal = create_glottal_pulse_train(t, f0)
    # Formants for cute rounded mouth ('Ooo/Mmm'): F1=420, F2=980, F3=2600
    vocal = apply_formants(glottal, [420, 980, 2600], [60, 90, 140])
    
    env = np.sin(np.pi * (t / dur))**0.9
    
    # Cheek-pop puff at the beginning / end
    noise = np.random.normal(0, 1, size=len(t))
    b_pop, a_pop = signal.butter(2, [350 / (SAMPLE_RATE/2), 2200 / (SAMPLE_RATE/2)], btype='band')
    pop_puff = signal.lfilter(b_pop, a_pop, noise) * np.exp(-((t - 0.24)/0.04)**2) * 0.35
    
    combined = vocal * env + pop_puff
    combined = combined / (np.max(np.abs(combined)) + 1e-6) * 0.88
    return combined

def generate_cartoon_grumble_4():
    """
    4. Comical Cartoon Grumble ('Hrrr-mph! 💢')
    Chest grumble with comical cartoon throat flutter into an indignant snap.
    """
    dur = 0.40
    t = np.linspace(0, dur, int(SAMPLE_RATE * dur), endpoint=False)
    
    # Pitch: 150 Hz -> 180 Hz -> 115 Hz
    f0 = 150.0 + 30.0 * np.sin(np.pi * t / dur) - 45.0 * (t / dur)**1.5
    
    # Throat flutter (18Hz amplitude modulation, sounds like a comical cartoon purr/growl, not robotic!)
    flutter = 1.0 + 0.35 * np.sin(2 * np.pi * 18 * t)
    
    glottal = create_glottal_pulse_train(t, f0) * flutter
    vocal = apply_formants(glottal, [360, 1250, 2200], [80, 120, 150])
    
    env = np.sin(np.pi * (t / dur)**0.8)**1.1
    
    # Plosive huff at end
    noise = np.random.normal(0, 1, size=len(t))
    b_huff, a_huff = signal.butter(2, [400 / (SAMPLE_RATE/2), 3000 / (SAMPLE_RATE/2)], btype='band')
    huff = signal.lfilter(b_huff, a_huff, noise) * np.exp(-((t - 0.32)/0.04)**2) * (t >= 0.28) * 0.45
    
    combined = vocal * env + huff
    combined = combined / (np.max(np.abs(combined)) + 1e-6) * 0.90
    return combined

def main():
    sounds = [
        ("soft_angry_1.wav", generate_hmph_1()),
        ("soft_angry_2.wav", generate_grump_wah_2()),
        ("soft_angry_3.wav", generate_cute_pout_3()),
        ("soft_angry_4.wav", generate_cartoon_grumble_4()),
    ]
    
    os.makedirs("assets", exist_ok=True)
    os.makedirs("public", exist_ok=True)
    
    for filename, sound in sounds:
        # Convert float to int16
        audio_int16 = np.int16(sound * 32767)
        
        path_assets = os.path.join("assets", filename)
        path_public = os.path.join("public", filename)
        
        wavfile.write(path_assets, SAMPLE_RATE, audio_int16)
        wavfile.write(path_public, SAMPLE_RATE, audio_int16)
        print(f"Generated {filename}: {len(sound)} samples ({len(sound)/SAMPLE_RATE:.2f}s)")

if __name__ == "__main__":
    main()
