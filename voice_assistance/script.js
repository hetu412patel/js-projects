 let btn = document.querySelector("#btn")
 let content = document.querySelector("#content")
 let voice = document.querySelector("#voice")

 const speak = (text) => {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "hi-GB"
    window.speechSynthesis.speak(text_speak)
 }

 const wishMe = () => {
   let date = new Date()
   let hours = date.getHours()
   if(hours >= 0 && hours < 12){
      speak('Good morning sir')
   }else if(hours >= 12 && hours < 16){
      speak('Good afternoon sir')
   }else{
      speak('Good evening sir')
   }
 }

 window.addEventListener('load',() => {
   wishMe()
 })

 let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
 let recognition = new speechRecognition()
 recognition.onresult = (event) => {
   let transcript = event.results[event.resultIndex][0].transcript
   content.innerText = transcript
   takeCommand(transcript.toLowerCase())
 }

 btn.addEventListener('click',() => {
   recognition.start()
   btn.style.display = 'none'
   voice.style.display = "block"
 })

 const takeCommand = (message) => {
   btn.style.display = "flex"
   voice.style.display = "none"
   if(message.includes("hello")||message.includes("hey")||message.includes("hi")||message.includes("hii")||message.includes("hi hi")){
      speak('hello sir, what can i help you?')
   }else if(message.includes('gender')){
      speak("I don’t have a gender, but I’m here to assist you!")
   }else if(message.includes('who are you')|| message.includes('who you are') || message.includes('who is created you')|| message.includes('what is you')|| message.includes('hu r u')){
      speak('I am a virtual assistant, created by Hetakshi Madam, to provide assistance and simplify your tasks.')
   }else if(message.includes('why are you')||message.includes('Why were you created')){
      speak('I was created to help you with information, tasks, and problem-solving, ensuring your life is easier and more efficient. How can I help you today?')
   }else if(message.includes('Are you human?')){
      speak('No, I’m not human. I’m a virtual assistant programmed to assist you intelligently.')
   }else if(message.includes('How can you help me')){
      speak('I can assist with information, manage tasks, solve problems, and make your day-to-day activities more convenient. Just let me know what you need!')
   }else if(message.includes('What is your purpose')){
      speak('My purpose is to assist, guide, and support you in whatever tasks or questions you have.')
   }else if(message.includes('Do you have emotions')){
      speak('No, I don’t have emotions, but I am designed to understand and respond empathetically to your needs.')
   }else if(message.includes('Can you think')){
      speak('I don’t think like a human, but I use advanced algorithms to analyze and provide helpful responses.')
   }else if(message.includes('wish me luck')){
      speak('Good luck! Believe in yourself, stay positive, and give it your best shot.')
   }else if(message.includes('bye')|| message.includes('tata')||message.includes('sia')||message.includes('see you soon')||message.includes('meet soon')||message.includes('see you again')){
      speak('Goodbye! Take care and have a wonderful day ahead. I’m here whenever you need me!')
   }else if(message.includes('thank you')|| message.includes('thanks')|| message.includes('thanks a lot')|| message.includes('thank')){
      speak('You are welcome! I am always here to help. Let me know if there is anything else you need!')
   }else if(message.includes('open youtube')){
      speak('opening youtube')
      window.open('https://www.youtube.com','_blank')
   }else if(message.includes('open google')){
      speak('opening google')
      window.open('https://www.google.com','_blank')
   }else if(message.includes('open facebook')){
      speak('opening facebook')
      window.open('https://www.facebook.com','_blank')
   }else if(message.includes('open linkedin')){
      speak('opening linkedin')
      window.open('https://www.linkedin.com','_blank')
   }else if(message.includes('open naukri')|| message.includes('open naukri.com')){
      speak('opening naukri.com')
      window.open('https://www.naukri.com','_blank')
   }else if(message.includes('open instagram')){
      speak('opening instagram')
      window.open('https://www.instagram.com','_blank')
   }else if(message.includes('open calculator')){
      speak('opening calculator')
      window.open('calculator://')
   }else if(message.includes('open whatsapp')){
      speak('opening whatsapp')
      window.open('whatsapp://')
   }else if(message.includes('time')){
      let time = new Date().toLocaleString(undefined, {hour:'numeric', minute:'numeric'})
      speak(time)
   }else if(message.includes('date')){
      let date = new Date().toLocaleString(undefined, {day:'numeric', month:'short'})
      speak(date)
   }else{
      let finalText = "this is what i found on internet regarding" + message.replace('astra','')
      speak(finalText)
      window.open(`https://www.google.com/search?q=${message.replace('astra','')}`,"_blank")
   }
 }