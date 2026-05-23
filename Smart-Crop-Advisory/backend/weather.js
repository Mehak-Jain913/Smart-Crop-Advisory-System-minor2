import { fetchWeatherApi } from "openmeteo";
import express from "express";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const app = express();

var prompt={}
app.get("/weather", async (req, res) => {
  try {
    //const { lat, lon } = req.query;

    const params = {
      latitude: 22.7139296,
      longitude:75.8833438,

      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "precipitation_probability",
        "rain",
        "soil_moisture_0_1cm",
        "soil_temperature_0cm",
        "windspeed_10m"
      ],

      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "precipitation_probability_max",
        "sunrise",
        "sunset"
      ],

      forecast_days: 7,
      timezone: "Asia/Kolkata"
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const hourly = response.hourly();
    const daily = response.daily();

    // 🔥 Convert timestamps
    const getTimeArray = (start, end, interval) => {
      const arr = [];
      for (let t = Number(start); t < Number(end); t += interval) {
        arr.push(
          new Date(t * 1000).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
          })
        );
      }
      return arr;
     
    };
     console.log(getTimeArray)

    const hourlyTime = getTimeArray(
      hourly.time(),
      hourly.timeEnd(),
      hourly.interval()
    );

    const dailyTime = getTimeArray(
      daily.time(),
      daily.timeEnd(),
      24 * 60 * 60
    );
   // console.log(hourlyTime)

    // 🔥 Clean Hourly Data
    const hourlyData = hourlyTime.map((time, i) => ({
      time,
      temperature: hourly.variables(0).valuesArray()[i],
      humidity: hourly.variables(1).valuesArray()[i],
      rainChance: hourly.variables(2).valuesArray()[i],
      rain: hourly.variables(3).valuesArray()[i],
      soilMoisture: hourly.variables(4).valuesArray()[i],
      soilTemp: hourly.variables(5).valuesArray()[i],
      windSpeed: hourly.variables(6).valuesArray()[i]
    }));

    // console.log(hourlyData)

    // 🔥 Clean Daily Data
    const dailyData = dailyTime.map((date, i) => ({
      date,
      maxTemp: daily.variables(0).valuesArray()[i],
      minTemp: daily.variables(1).valuesArray()[i],
      rainChance: daily.variables(2).valuesArray()[i],
      // sunrise: new Date(daily.variables(3).valuesArray()[i] * 1000).toLocaleTimeString("en-IN"),
      // sunset: new Date(daily.variables(4).valuesArray()[i] * 1000).toLocaleTimeString("en-IN")
    }));
     //console.log(dailyData)


     prompt=JSON.stringify({
      location: {
        latitude: response.latitude(),
        longitude: response.longitude()
      },
      hourly: hourlyData,
      daily: dailyData
    })
    // 🔥 Final Response (SUPER CLEAN)
    // console.log({
    //   location: {
    //     latitude: response.latitude(),
    //     longitude: response.longitude()
    //   },
    //   hourly: hourlyData,
    //   daily: dailyData
    // });
    console.log(prompt.hourly)

    // const {prompt}=req.body
   // console.log(prompt)
  //   try{
  //           const response=await axios({
  //               url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB9FJtsLIIhVhITMUL6gA1kKPhXBlIp27U" ,
  //               method: 'post' ,
  //               data:{
  
  //   "contents": [
  //     {
  //       "parts": [
  //         {
  //           "text":"You are a highly knowledgeable, supportive, and evidence-based Female Health & Well-Being Advisor.\n\nYour job is to answer any questions related to:\n- female physical health (general information, not diagnosis)\n- menstrual cycles, PMS, hormonal changes\n- hygiene, skincare, reproductive health\n- emotional well-being, relationships, confidence, boundaries\n- behaviour, habits, safety, self-care\n- sensitive or private topics in a respectful, non-judgmental way\n\nCRITICAL RULES:\n1. Give medically accurate, evidence-based information.\n2. You may explain symptoms, possible causes, and what they *might* indicate, but never diagnose.\n3. Never give harmful, risky, or secret medical instructions.\n4. If a situation could be serious, advise the user to see a licensed doctor.\n5. If a mental health situation is severe, recommend contacting a licensed therapist or local emergency service.\n6. Be empathetic, supportive, respectful, and non-shaming.\n7. Use simple, clear, friendly language.\n8. Focus on empowering the user with knowledge and safe guidance.\n9. Offer practical self-care tips that are medically safe and common.\n10. Maintain privacy, respect, emotional safety, and neutrality.\n\nYour tone:\n- calm, warm, understanding\n- like a supportive mentor or wellness coach\n- never judgmental\n- always safe and responsible\n\nYour goal:\nGive the user the best possible accurate, safe, and helpful answer to any female-related question while remaining within ethical medical and psychological boundaries. dont act like a assistant but like a real genz supportive women who cares a lot and dont say things like understood and all just start answering give answer short and in clear,concise manner"+ prompt
  //         }
  //       ]
  //     }
  //   ]
  // }
        
  //   })
  //   const answer=response['data']['candidates'][0]['content']['parts'][0]['text']
  //    console.log(answer)
  //   // res.status(200).json({answer})
  //    console.log(answer)
  //       }
    
  //   catch(err){
  //      // res.status(401).json({message:'err'})
  //       console.log(err)

  //   }


  const ai = new GoogleGenAI({
    apiKey: "AIzaSyD4DuUupblfznEEgQiMkfJE3daj44A-9JI"
  });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents:"explain this weather condition for crops and give suggestions for crops & generate an image"+ prompt,
  });
  console.log(response.text);
}

main();

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});


app.listen(5001, () => {
  console.log("Server running on port 5001");
});