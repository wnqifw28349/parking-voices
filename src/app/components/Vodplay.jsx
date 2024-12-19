"use client";
import React from "react";
import { useState } from "react";
import { clsx } from "clsx";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { GiUltrasound } from "react-icons/gi";
import { PiUserSound } from "react-icons/pi";

export default function VoiceOfDay({ data }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to handle text-to-speech
  const handlePlayText = () => {
    const synth = window.speechSynthesis;
    // Set voice options
    const voices = window.speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance(data.content);
    const britishMaleVoice = voices.find(
      (voice) =>
        voice.lang === "en-GB" && voice.name.toLowerCase().includes("male")
    );
    if (britishMaleVoice) utterance.voice = britishMaleVoice;

    utterance.rate = 0.85; // Slower pace
    utterance.pitch = 0.75; // Neutral pitch
    utterance.volume = 0.55; // Default volume

    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    synth.speak(utterance);
    setIsSpeaking(true);

    utterance.onend = () => setIsSpeaking(false);
  };

  // console.log("The voice of the day day data", data);
  const userotd = data.username;
  // const contotd = data.content;
  // console.log(data.username, data.content);

  return (
    <button onClick={handlePlayText}>
      <div className="text-center rounded-full p-1 bg-green-600 text-white">
        <PiUserSound size={24} className={clsx("hover:text-orange-600")} />
      </div>
    </button>
  );
}
