import React from "react";
import Image from "next/image";
import InteractionIcons from "@/app/components/InteractionIcon";
import { db } from "@/utils/db";
import { Amp } from "./AmpVote";
import { clsx } from "clsx";
import Vodplay from "./Vodplay";
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

export default async function VoiceOfDay() {
  const response = await db.query(`
    SELECT  * FROM voices
    WHERE voices.created_at >= NOW() - INTERVAL '1 month'
    ORDER BY voices.amplifiers_count DESC
    LIMIT 1;
`);
  const data = response.rows[0];
  // const reply = await db.query(`SELECT user_id, username, FROM users`);
  // const userlink = reply.rows;

  console.log("The voice of the day day data", data);
  const userotd = data.username;
  const contotd = data.content;
  console.log(data.username, data.content);

  return (
    <div className="max-w-4xl mx-auto mt-6 pb-2">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* <div className="container mx-auto max-w-4xl "> */}
        <CardHeader className="flex-row items-center align-center justify-between p-4 bg-gray-50">
          <CardTitle className="text-lg font-bold text-gray-700 items-center text-center">
            <h3>Voice of the Day</h3>
          </CardTitle>
          <Vodplay data={data} />
          {/* <div className="inline-block text-center rounded-full p-1 bg-green-600 text-white">
            <PiUserSound size={24} className={clsx("hover:text-orange-600")} />
          </div> */}
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p>{data.content}</p>
        </CardContent>
        {/* <h3 className="text-xl font-bold text-800 mb-4 text-lime-400 text-center">
          Voice of the Day: {data.username}
          {/* {data.username} */}
        {/* </h3> */}
        {/* </div> */}
        <CardFooter className="bg-gray-100 p-2 items-right justify-between">
          <CardDescription>
            <div className="flex items-center">
              <div>
                <Amp
                  voiceId={data.voice_id}
                  amplifiersCount={data.amplifiers_count}
                />
              </div>
              {/* <button className="flex items-center justify-center text-white w-8 h-8 rounded-full shadow-md">
                <img
                  src="/ampicon.svg"
                  alt="amp button"
                  className="w-8 h-8 mr-1 items-center"
                  color="black"
                />
              </button> */}
            </div>
          </CardDescription>
          <div className="bg-gray-100 p-2 items-right">
            <p className="text-gray-700 font-semibold text-sm text-right">
              Voiced by:
              <span className="text-green-600">{data.username}</span>
            </p>
          </div>
        </CardFooter>
        {/* <InteractionIcons /> */}
      </Card>
    </div>
  );
}
