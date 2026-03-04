const ui = {
  happinessValue: document.getElementById("happinessValue"),
  happinessFill: document.getElementById("happinessFill"),
  pretzelValue: document.getElementById("pretzelValue"),
  statusText: document.getElementById("statusText"),
  ctaText: document.getElementById("ctaText"),
  modeHappyButton: document.getElementById("modeHappyButton"),
  modeTeaseButton: document.getElementById("modeTeaseButton"),
  controls: document.querySelector(".controls"),
  erikAvatar: document.getElementById("erikAvatar"),
  scene: document.getElementById("scene"),
  actionGrid: document.getElementById("actionGrid"),
  actionProp: document.getElementById("actionProp"),
  outfitReveal: document.getElementById("outfitReveal"),
  actionEmoji: document.getElementById("actionEmoji")
};

const actions = [
  {
    id: "cuddle",
    label: "🤗 Knuddeln",
    type: "happy",
    emoji: "🤗",
    propClass: "cuddle",
    sceneClass: "action-cuddle",
    happiness: 14,
    pretzelDelta: 1,
    status: "Ami tritt näher ran, umarmt Erik fest und er wird glücklich."
  },
  {
    id: "kiss",
    label: "💋 Kuss",
    type: "happy",
    emoji: "💋",
    propClass: "kiss",
    sceneClass: "action-kiss",
    happiness: 9,
    pretzelDelta: 1,
    status: "Ami kommt ganz nah und gibt Erik einen Kuss."
  },
  {
    id: "undress",
    label: "👚 Ausziehen",
    type: "happy",
    emoji: "👚",
    propClass: "undress",
    sceneClass: "action-undress",
    happiness: 24,
    pretzelDelta: 1,
    durationMs: 3000,
    status: "Ami zieht kurz das Outfit aus. Erik ist überglücklich."
  },
  {
    id: "lego",
    label: "🌹 Lego bauen",
    type: "happy",
    emoji: "🌹",
    propClass: "feed",
    sceneClass: "action-gift",
    happiness: 10,
    pretzelDelta: 1,
    status: "Lego-Rosen-Paket übergeben. Erik freut sich aufs Bauen."
  },
  {
    id: "doner",
    label: "🥙 Döner",
    type: "happy",
    emoji: "🥙",
    propClass: "feed",
    sceneClass: "action-eat",
    happiness: 7,
    pretzelDelta: 1,
    status: "Ami drückt ihm einen Döner in die Hand, Erik isst zufrieden."
  },
  {
    id: "pizza",
    label: "🍕 Pizza",
    type: "happy",
    emoji: "🍕",
    propClass: "feed",
    sceneClass: "action-eat",
    happiness: 7,
    pretzelDelta: 1,
    status: "Pizza-Action: Erik beißt rein und lächelt."
  },
  {
    id: "beer",
    label: "🍺 Bier",
    type: "happy",
    emoji: "🍺",
    propClass: "feed",
    sceneClass: "action-drink",
    happiness: 6,
    pretzelDelta: 1,
    status: "Bier in die Hand, Erik trinkt und wird entspannter."
  },
  {
    id: "cola",
    label: "🥤 Cola",
    type: "happy",
    emoji: "🥤",
    propClass: "feed",
    sceneClass: "action-drink",
    happiness: 6,
    pretzelDelta: 1,
    status: "Cola Zero gereicht. Erik nimmt einen großen Schluck."
  },
  {
    id: "aquarium",
    label: "🦐 Aquarium zeigen",
    type: "happy",
    emoji: "🦐",
    propClass: "aquarium",
    sceneClass: "action-aquarium",
    happiness: 11,
    pretzelDelta: 1,
    status: "Ami zeigt das Garnelenaquarium. Erik schaut gebannt zu."
  },
  {
    id: "tickle",
    label: "😵 Kitzeln",
    type: "tease",
    emoji: "🪶",
    propClass: "tease",
    sceneClass: "action-tease",
    happiness: -8,
    pretzelDelta: -1,
    status: "Ami kitzelt Erik. Er winkt ärgerlich mit den Armen."
  },
  {
    id: "badFood",
    label: "🥕 Falsches Essen",
    type: "tease",
    emoji: "🥕",
    propClass: "tease",
    sceneClass: "action-eat",
    happiness: -9,
    pretzelDelta: -1,
    status: "Unbeliebtes Essen macht Erik klar unglücklicher."
  },
  {
    id: "insult",
    label: "🗯️ Beleidigung",
    type: "tease",
    emoji: "🗯️",
    propClass: "tease",
    sceneClass: "action-tease",
    happiness: -8,
    pretzelDelta: -1,
    status: "Ami beleidigt Erik."
  },
  {
    id: "wetTissue",
    label: "💧 Nasses Papiertuch werfen",
    type: "tease",
    emoji: "💧",
    propClass: "tease",
    sceneClass: "action-tease",
    happiness: -10,
    pretzelDelta: -1,
    status: "Nasses Taschentuch trifft Erik."
  }
];

const dislikedFoodProps = [
  { id: "pretzel", name: "Bretzel", emoji: "🥨" },
  { id: "karotte", name: "Karotte", emoji: "🥕" },
  { id: "kuerbis", name: "Kürbis", emoji: "🎃" },
  { id: "falafel", name: "Falafel", emoji: "🧆" },
  { id: "ziegenkaese", name: "Ziegenkäse", emoji: "🧀" }
];

const insultProps = [
  {
    id: "digga",
    label: "digga sagen",
    status: "Ami sagt „Digga“. Erik ist davon gar nicht begeistert."
  },
  {
    id: "bloedian",
    label: "blödian sagen",
    status: "Ami sagt „Blödian“. Erik schaut sofort beleidigt."
  },
  {
    id: "heute_zahle_ich",
    label: "heute zahle ich sagen",
    status: "Ami sagt „Heute zahle ich“. Erik fühlt sich veräppelt."
  }
];

const sceneActionClasses = [
  "action-cuddle",
  "action-kiss",
  "action-drink",
  "action-eat",
  "action-aquarium",
  "action-undress",
  "action-gift",
  "action-tease"
];

const state = {
  happiness: 12,
  pretzels: 0,
  mode: "happy",
  selectedActionId: null,
  selectedBadFoodId: dislikedFoodProps[0].id,
  selectedInsultId: insultProps[0].id,
  moodLock: null,
  statusTimeout: null,
  erikPulseTimeout: null,
  outfitRevealTimeout: null,
  propTimeout: null,
  sceneTimeout: null
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getActionById(actionId) {
  return actions.find((action) => action.id === actionId) || null;
}

function modeActions() {
  return actions.filter((action) => action.type === state.mode);
}

function getDislikedFoodById(foodId) {
  return dislikedFoodProps.find((food) => food.id === foodId) ?? dislikedFoodProps[0];
}

function getInsultById(insultId) {
  return insultProps.find((insult) => insult.id === insultId) ?? insultProps[0];
}

function setStatus(text, options = {}) {
  const { error = false } = options;
  clearTimeout(state.statusTimeout);
  ui.statusText.textContent = text;
  ui.statusText.classList.remove("is-error", "error-pop");
  if (error) {
    ui.statusText.classList.add("is-error");
    void ui.statusText.offsetWidth;
    ui.statusText.classList.add("error-pop");
  }
  ui.statusText.classList.add("visible");
}

function setTransientStatus(text, durationMs = 5000, options = {}) {
  setStatus(text, options);
  state.statusTimeout = window.setTimeout(() => {
    ui.statusText.classList.remove("visible", "is-error", "error-pop");
  }, durationMs);
}

function pulseErik() {
  clearTimeout(state.erikPulseTimeout);
  ui.erikAvatar.classList.remove("is-pulsing");
  void ui.erikAvatar.offsetWidth;
  ui.erikAvatar.classList.add("is-pulsing");
  state.erikPulseTimeout = window.setTimeout(() => {
    ui.erikAvatar.classList.remove("is-pulsing");
  }, 900);
}

function setMoodLock(mood, durationMs = 1200) {
  state.moodLock = {
    mood,
    until: performance.now() + durationMs
  };
}

function currentMood() {
  if (state.moodLock && performance.now() < state.moodLock.until) {
    return state.moodLock.mood;
  }
  state.moodLock = null;
  return state.happiness >= 62 ? "happy" : "sad";
}

function renderHud() {
  ui.happinessValue.textContent = `${Math.round(state.happiness)}%`;
  ui.happinessFill.style.width = `${Math.round(state.happiness)}%`;
  ui.pretzelValue.textContent = String(state.pretzels);

  const mood = currentMood();
  ui.erikAvatar.classList.remove("mood-sad", "mood-happy", "mood-angry");
  ui.erikAvatar.classList.add(`mood-${mood}`);
}

function clearSceneActions() {
  sceneActionClasses.forEach((actionClass) => ui.scene.classList.remove(actionClass));
}

function playAnimation(action) {
  clearTimeout(state.propTimeout);
  clearTimeout(state.sceneTimeout);
  clearTimeout(state.outfitRevealTimeout);

  clearSceneActions();
  if (action.sceneClass) {
    ui.scene.classList.add(action.sceneClass);
  }

  const durationMs = action.durationMs ?? 960;

  ui.outfitReveal.classList.remove("show");
  ui.outfitReveal.classList.add("is-hidden");
  if (action.id === "undress") {
    ui.outfitReveal.classList.remove("is-hidden");
    ui.outfitReveal.classList.add("show");
    state.outfitRevealTimeout = window.setTimeout(() => {
      ui.outfitReveal.classList.remove("show");
      ui.outfitReveal.classList.add("is-hidden");
    }, durationMs);
  }

  const hideActionProp = action.id === "undress";
  if (hideActionProp) {
    ui.actionProp.className = "action-prop is-hidden";
  } else {
    ui.actionEmoji.textContent = action.emoji;
    ui.actionProp.className = "action-prop";
    ui.actionProp.classList.add("show");
    if (action.propClass) {
      ui.actionProp.classList.add(action.propClass);
    }

    state.propTimeout = window.setTimeout(() => {
      ui.actionProp.className = "action-prop is-hidden";
    }, durationMs);
  }

  state.sceneTimeout = window.setTimeout(() => {
    clearSceneActions();
  }, durationMs + 120);
}

function changeHappiness(amount) {
  state.happiness = clamp(state.happiness + amount, 1, 100);
}

function changePretzels(amount) {
  state.pretzels = Math.max(0, state.pretzels + amount);
}

function renderSelectionTexts() {
  ui.ctaText.textContent = "Tippe auf Erik, um ihn glücklich zu machen & verdiene damit Bretzeln.";
}

function selectAction(actionId) {
  state.selectedActionId = actionId;
  renderActionButtons();
  renderSelectionTexts();
}

function createActionButton(action) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = action.label;
  button.dataset.actionId = action.id;
  button.classList.add(action.type === "happy" ? "tone-happy" : "tone-tease");
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    selectAction(action.id);
    executeActionById(action.id);
  });
  return button;
}

function createInlineOptionControl(action) {
  if (action.id !== "badFood" && action.id !== "insult") return null;

  const wrap = document.createElement("div");
  wrap.className = "action-inline-option";

  const select = document.createElement("select");

  if (action.id === "badFood") {
    select.setAttribute("aria-label", "Falsches Essen wählen");
    dislikedFoodProps.forEach((food) => {
      const option = document.createElement("option");
      option.value = food.id;
      option.textContent = `${food.emoji} ${food.name}`;
      select.appendChild(option);
    });
    select.value = state.selectedBadFoodId;
    select.addEventListener("change", () => {
      state.selectedBadFoodId = select.value;
    });
  } else {
    select.setAttribute("aria-label", "Beleidigung wählen");
    insultProps.forEach((insult) => {
      const option = document.createElement("option");
      option.value = insult.id;
      option.textContent = insult.label;
      select.appendChild(option);
    });
    select.value = state.selectedInsultId;
    select.addEventListener("change", () => {
      state.selectedInsultId = select.value;
    });
  }

  wrap.append(select);
  wrap.addEventListener("click", (event) => event.stopPropagation());
  select.addEventListener("click", (event) => event.stopPropagation());

  return wrap;
}

function renderActionButtons() {
  ui.actionGrid.innerHTML = "";
  const filteredActions = modeActions();

  const selected = getActionById(state.selectedActionId);
  if (!selected || selected.type !== state.mode) {
    state.selectedActionId = filteredActions[0]?.id ?? null;
  }

  filteredActions.forEach((action) => {
    const button = createActionButton(action);
    button.classList.toggle("selected", action.id === state.selectedActionId);
    ui.actionGrid.appendChild(button);

    if (action.id === state.selectedActionId) {
      const options = createInlineOptionControl(action);
      if (options) {
        ui.actionGrid.appendChild(options);
      }
    }
  });
}

function setMode(mode) {
  state.mode = mode;
  ui.modeHappyButton.classList.toggle("is-active", mode === "happy");
  ui.modeTeaseButton.classList.toggle("is-active", mode === "tease");
  renderActionButtons();
  renderSelectionTexts();
}

function getRandomDislikedFood() {
  return getDislikedFoodById(state.selectedBadFoodId);
}

function executeActionById(actionId) {
  const selected = getActionById(actionId);
  if (!selected) {
    setTransientStatus("Wähle zuerst ein Action-Item aus.", 2800);
    setMoodLock("sad", 700);
    renderHud();
    return;
  }

  const action = { ...selected };

  if (action.type !== state.mode) {
    setTransientStatus("Diese Aktion passt nicht zur aktuellen Vorauswahl.", 2800);
    setMoodLock("sad", 700);
    renderHud();
    return;
  }

  if (action.type === "tease" && state.pretzels < 1) {
    setTransientStatus(
      "Zu wenige Bretzeln um Erik zu Ärgern. Verdiene sie dir, indem du ihn glücklich machst.",
      5000,
      { error: true }
    );
    setMoodLock("sad", 900);
    renderHud();
    return;
  }

  if (action.id === "wetTissue") {
    const dodged = Math.random() < 0.5;
    if (dodged) {
      action.happiness = -2;
      action.status = "Erik weicht dem nassen Taschentuch aus (50% Dodge).";
    } else {
      action.happiness = -10;
      action.status = "Treffer mit nassem Taschentuch. Erik ist genervt.";
    }
  }

  if (action.id === "badFood") {
    const selectedFood = getRandomDislikedFood();
    action.emoji = selectedFood.emoji;
    action.status = `${selectedFood.name}? Das mag Erik gar nicht.`;
  }

  if (action.id === "insult") {
    const selectedInsult = getInsultById(state.selectedInsultId);
    action.emoji = "🗯️";
    action.status = selectedInsult.status;
  }

  changeHappiness(action.happiness);
  changePretzels(action.pretzelDelta);
  pulseErik();
  setTransientStatus(action.status, 5000);
  playAnimation(action);

  if (action.type === "tease") {
    setMoodLock("angry", 1600);
  } else if (action.id === "undress") {
    setMoodLock("happy", action.durationMs ?? 3000);
  } else {
    setMoodLock("happy", 1500);
  }

  renderHud();
}

function executeSelectedAction(event) {
  if (event) {
    event.stopPropagation();
  }
  executeActionById(state.selectedActionId);
}

function setupEvents() {
  ui.modeHappyButton.addEventListener("click", (event) => {
    event.stopPropagation();
    setMode("happy");
  });
  ui.modeTeaseButton.addEventListener("click", (event) => {
    event.stopPropagation();
    setMode("tease");
  });
  ui.controls.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  ui.erikAvatar.addEventListener("click", executeSelectedAction);
}

function moodTick() {
  renderHud();
  requestAnimationFrame(moodTick);
}

function init() {
  setMode("happy");
  setupEvents();
  renderSelectionTexts();
  setStatus("Wähle eine Aktion und tippe dann auf Erik.");
  renderHud();
  requestAnimationFrame(moodTick);
}

init();
