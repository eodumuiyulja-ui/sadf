const intro = document.getElementById("intro");
const registration = document.getElementById("registration");
const site = document.getElementById("site");
const enterButton = document.getElementById("enterButton");
const skipButton = document.getElementById("skipButton");
const completeButton = document.getElementById("completeButton");
const registrationTitle = document.getElementById("registrationTitle");
const registrationText = document.getElementById("registrationText");
const registrationLog = document.getElementById("registrationLog");
const introSystem = document.getElementById("introSystem");

let sequenceTimers = [];

function clearSequence() {
  sequenceTimers.forEach(clearTimeout);
  sequenceTimers = [];
}

function showSite() {
  clearSequence();
  intro.classList.add("hidden");
  registration.classList.add("hidden");
  site.classList.remove("hidden");
  document.body.classList.remove("intro-mode");
}

function addLog(message, type = "") {
  const line = document.createElement("div");
  line.className = `log-line ${type}`;
  line.textContent = `> ${message}`;
  registrationLog.appendChild(line);
}

function runArrivalSequence() {
  clearSequence();
  registrationLog.innerHTML = "";
  completeButton.classList.add("hidden");
  intro.classList.remove("hidden", "fade-out", "connecting");
  registration.classList.add("hidden");
  site.classList.add("hidden");
  introSystem.textContent = "INTERDIMENSIONAL GATE SYSTEM";
  enterButton.disabled = true;
  skipButton.disabled = true;
  intro.classList.add("connecting");

  const steps = [
    [500, "관문 에너지 반응 확인", "ok"],
    [1250, "차원 좌표 검색 중..."],
    [2100, "CENTRAL HUB 좌표 확인", "ok"],
    [2950, "연결 안정성 검사 완료", "ok"],
    [3800, "관문 개방", "ok"]
  ];
  steps.forEach(([delay, message, type]) => {
    sequenceTimers.push(setTimeout(() => {
      introSystem.textContent = message.toUpperCase();
    }, delay));
  });
  sequenceTimers.push(setTimeout(() => {
    intro.classList.add("fade-out");
    registration.classList.remove("hidden");
    registrationTitle.textContent = "중앙 허브 도착";
    registrationText.textContent = "방문자의 중앙 허브 진입이 확인되었습니다.";
    addLog("GATE CONNECTION: ESTABLISHED", "ok");
    addLog("DESTINATION: ORBIS CENTRAL HUB", "ok");
    addLog("VISITOR STATUS: UNREGISTERED", "warn");
    addLog("TRAVELER REGISTRATION: IN PROGRESS");
  }, 4550));
  sequenceTimers.push(setTimeout(() => {
    registrationTitle.textContent = "여행자 등록 완료";
    registrationText.textContent = "신규 방문자가 오르비스 소속 여행자로 등록되었습니다.";
    addLog("ASSIGNED RANK: 05 / TRAVELER", "ok");
    addLog("ACCESS PERMISSION: TRAVELER", "ok");
    addLog("WELCOME TO ORBIS.", "ok");
    completeButton.classList.remove("hidden");
    enterButton.disabled = false;
    skipButton.disabled = false;
  }, 5700));
}

function skipArrival() {
  clearSequence();
  intro.classList.add("hidden");
  registration.classList.remove("hidden");
  registrationTitle.textContent = "여행자 등록 완료";
  registrationText.textContent = "인트로를 건너뛰었습니다. 방문자 등록이 완료되었습니다.";
  registrationLog.innerHTML = "";
  ["GATE CONNECTION: ESTABLISHED", "DESTINATION: ORBIS CENTRAL HUB", "ASSIGNED RANK: 05 / TRAVELER", "ACCESS PERMISSION: TRAVELER"].forEach(item => addLog(item, "ok"));
  completeButton.classList.remove("hidden");
}

enterButton.addEventListener("click", runArrivalSequence);
skipButton.addEventListener("click", skipArrival);
completeButton.addEventListener("click", showSite);
document.getElementById("replayIntro").addEventListener("click", runArrivalSequence);
