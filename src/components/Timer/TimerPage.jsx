"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/Timer.module.css";
import { MdOutlineTimer, MdOutlineVibration, MdOutlineVolumeUp } from "react-icons/md";
import { IoChevronBackSharp } from "react-icons/io5";

const TimerPage = () => {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tab, setTab] = useState("stopwatch");
  const [records, setRecords] = useState(null);
  const [selectedSound, setSelectedSound] = useState("default-alarm");
  const alarmAudioRef = useRef(null);

  const sounds = [
    { id: "default-alarm", label: "Default Alarm", src: "/sounds/default-alarm.mp3" },
    { id: "chime", label: "Chime", src: "/sounds/chime.mp3" },
    { id: "beep", label: "Beep", src: "/sounds/beep-01a.wav" },
  ];

  useEffect(() => {
    let timer;
    if (isRunning) {
      if (tab === "countdown" && time > 0) {
        timer = setInterval(() => setTime((prev) => Math.max(prev - 1, 0)), 1000);
      } else if (tab === "stopwatch") {
        timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      }
    } else {
      clearInterval(timer);
    }

    if (tab === "countdown" && time === 0 && isRunning) {
      handleAlarm();
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, time, tab]);

  const handleAlarm = () => {
    const sound = sounds.find((s) => s.id === selectedSound);
    if (sound) {
      alarmAudioRef.current.src = sound.src;
      alarmAudioRef.current.play();

      setTimeout(() => {
        alarmAudioRef.current.pause();
        alarmAudioRef.current.currentTime = 0;
      }, 5000);
    }
  };

  // const handleReset = () => {
  //   setTime(0);
  //   setIsRunning(false);
  //   stopAlarm();
  // };

  const handleRecord = () => {
    setRecords(time);
    setTime(0);
    stopAlarm();
  };

  const stopAlarm = () => {
    alarmAudioRef.current.pause();
    alarmAudioRef.current.currentTime = 0;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={`${styles.timerPage}`}>
      <audio ref={alarmAudioRef}></audio>

      <div className={styles.header}>
        <div className={styles.headingContainer}>
          <IoChevronBackSharp onClick={()=>{router.back()}} className={styles.icon}/>
          <h2 className={styles.headerH2}>Timer</h2>
        </div>
        
        <div className={styles.soundContainer}>
          <MdOutlineVibration />
          <MdOutlineVolumeUp />
        </div>
      </div>

      <div className={styles.timerDisplay}>
        <div className={styles.circle}>
          <h1 className={styles.circleh1}>{formatTime(time)}</h1>
        </div>
      </div>

        <div className={styles.timerControls}>
            {tab === "countdown" && (
            <input
                type="number"
                placeholder="Enter seconds"
                onChange={(e) => setTime(parseInt(e.target.value, 10))}
                style={{
                padding: "5px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginRight: "10px",
                width: "80px",
                textAlign: "center",
                }}
                value={time}
            />
            )}

            {!isRunning && (time === 0 || (tab === "countdown" && time > 0)) && (
              <button className={styles.startBtn} onClick={() => setIsRunning(true)}>
                Start
              </button>
            )}

            {time !== 0 && isRunning && (
              <button className={styles.startBtn} onClick={() => setIsRunning(false)}>
                Pause
              </button>
            )}

            {time !== 0 && !isRunning && !(time === 0 || (tab === "countdown" && time > 0)) && (
              <button className={styles.startBtn} onClick={() => setIsRunning(true)}>
                Resume
              </button>
            )}

            {!isRunning && time !== 0 && (
              <button className={styles.recordBtn} onClick={handleRecord}>
                Stop
              </button>
            )}
        </div>

      <div className={styles.tabs}>
        {["stopwatch", "countdown", "intervals"].map((name) => (
          <button
            key={name}
            className={`${tab === name ? styles.active : ""} ${styles.tabButton}`}
            onClick={() => setTab(name)}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        ))}
      </div>

      {/* {tab === "countdown" && (
        <div className={styles.soundSelection}>
          <label>
            Select Alarm Sound:{" "}
            <select
              value={selectedSound}
              onChange={(e) => setSelectedSound(e.target.value)}
              style={{
                padding: "5px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginLeft: "10px",
              }}
            >
              {sounds.map((sound) => (
                <option key={sound.id} value={sound.id}>
                  {sound.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      )} */}

      <div className={styles.records}>
        {records ? (
          <div className={styles.lastRecordContainer}>
            <div className={styles.lastRecordTabWithIcon}>
              <MdOutlineTimer className={styles.timerIcon}/>
              <div className={styles.lastRecordTab}>
                <p className={styles.recordsh3}>Last Record</p>
                <div>{formatTime(records)}</div>
              </div>
            </div>
            <button className={styles.crossBtn}
                  onClick={() => setRecords(null)}
                  aria-label="Clear record"
            >
                  ×
            </button>
          </div>
        ) : (
          <p>No activity recorded</p>
        )
        }
      </div>
    </div>
  );
};

export default TimerPage;
