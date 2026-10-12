(() => {
  const windows = [...document.querySelectorAll(".app-window")];
  const startButton = document.getElementById("start-button");
  const startMenu = document.getElementById("start-menu");
  const taskButtons = document.getElementById("task-buttons");
  const clock = document.getElementById("clock");
  const clockDate = document.getElementById("clock-date");
  const clockTime = document.getElementById("clock-time");
  const aboutDialog = document.getElementById("about-dialog");
  let topZ = 20;
  const routes = { profile: "profile-window", research: "research-window", publications: "publications-window", activities: "news-window", cv: "cv-window", contact: "contact-window" };
  const returnFocus = new Map();
  const smallScreen = window.matchMedia("(max-width: 760px)");
  windows.forEach(win => { win.tabIndex = -1; });
  function routeFor(win) { return Object.keys(routes).find(key => routes[key] === win.id) || "profile"; }
  function setRoute(route) { if (location.hash !== "#" + route) history.pushState(null, "", "#" + route); }
  function notify(en, zh) {
    const box = document.getElementById("site-notice");
    box.textContent = document.documentElement.lang === "zh-CN" ? zh : en;
    clearTimeout(notify.timer); notify.timer = setTimeout(() => { box.textContent = ""; }, 3500);
  }
  function restoreFocus(win) {
    const target = returnFocus.get(win.id);
    if (target && target !== document.body && target !== document.documentElement && target.isConnected && target.getClientRects().length) target.focus({preventScroll:true});
    else document.querySelector(`[data-open="${win.id}"]`)?.focus({preventScroll:true});
  }
  function followRoute() {
    let route; try { route = decodeURIComponent(location.hash.slice(1)) || "profile"; } catch { route = "profile"; }
    const target = document.getElementById(route);
    const id = routes[route] || (target?.closest(".app-window")?.id);
    if (!id) return;
    openWindow(id, false);
    if (target && !routes[route]) {
      target.scrollIntoView({block:"start", behavior:"auto"});
      if (target.matches(".paper-record")) target.focus({preventScroll:true});
    }
  }
  window.addEventListener("hashchange", followRoute);
  window.addEventListener("popstate", followRoute);
  smallScreen.addEventListener("change", () => {
    if (smallScreen.matches) followRoute();
    else windows.forEach(win => { win.style.top = ""; win.style.left = ""; });
  });

  function setClock() {
    const now = new Date();
    const isChinese = document.documentElement.lang === "zh-CN";
    const locale = isChinese ? "zh-CN" : "en-GB";
    clock.dateTime = now.toISOString();
    clock.title = now.toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    clockDate.textContent = now.toLocaleDateString(locale, {
      day: "2-digit",
      month: "short"
    });
    clockTime.textContent = now.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  }

  function closeStartMenu() {
    startMenu.classList.remove("is-open");
    startMenu.setAttribute("aria-hidden", "true");
    startButton.classList.remove("is-active");
    startButton.setAttribute("aria-expanded", "false");
  }

  function focusWindow(win) {
    topZ += 1;
    win.style.zIndex = topZ;
    windows.forEach((item) => item.classList.toggle("is-focused", item === win));
    document.querySelectorAll(".task-button").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.window === win.id);
    });
  }

  function ensureTaskButton(win) {
    let taskButton = taskButtons.querySelector(`[data-window="${win.id}"]`);
    if (!taskButton) {
      taskButton = document.createElement("button");
      taskButton.type = "button";
      taskButton.className = "task-button";
      taskButton.dataset.window = win.id;
      const icon = document.createElement("img");
      icon.src = win.dataset.icon;
      icon.alt = "";
      const label = document.createElement("span");
      label.textContent = win.dataset.title;
      taskButton.append(icon, label);
      taskButton.addEventListener("click", () => {
        if (win.classList.contains("is-open") && win.classList.contains("is-focused")) {
          minimizeWindow(win);
        } else {
          openWindow(win.id);
        }
      });
      taskButtons.appendChild(taskButton);
    }
    return taskButton;
  }

  function updateTaskButtonLabels() {
    document.querySelectorAll(".task-button").forEach((button) => {
      const win = document.getElementById(button.dataset.window);
      const label = button.querySelector("span");
      if (win && label) label.textContent = win.dataset.title;
    });
  }

  function openWindow(id, updateRoute = true) {
    const win = document.getElementById(id);
    if (!win) return;
    if (!win.contains(document.activeElement)) returnFocus.set(id, document.activeElement);
    if (smallScreen.matches) windows.forEach(other => { if (other !== win) other.classList.remove("is-open", "is-focused"); });
    win.classList.add("is-open");
    win.classList.remove("is-minimized");
    ensureTaskButton(win);
    focusWindow(win);
    closeStartMenu();
    if (updateRoute) setRoute(routeFor(win));
    win.focus({preventScroll:true});
    if (smallScreen.matches) window.scrollTo({top:0, behavior:"instant"});
  }

  function minimizeWindow(win) {
    win.classList.remove("is-open");
    win.classList.add("is-minimized");
    const button = taskButtons.querySelector(`[data-window="${win.id}"]`);
    if (button) button.classList.remove("is-active");
    settleWindow(win);
  }

  function closeWindow(win) {
    win.classList.remove("is-open", "is-minimized", "is-focused", "is-maximized");
    const button = taskButtons.querySelector(`[data-window="${win.id}"]`);
    if (button) button.remove();
    settleWindow(win);
  }
  function settleWindow(win) {
    const remaining = windows.filter(w => w.classList.contains("is-open")).sort((a,b) => Number(b.style.zIndex)-Number(a.style.zIndex))[0];
    if (remaining) { focusWindow(remaining); setRoute(routeFor(remaining)); }
    else if (win.id !== "profile-window" || smallScreen.matches) openWindow("profile-window");
    else history.replaceState(null, "", location.pathname + location.search);
    restoreFocus(win);
  }

  function toggleMaximize(win) {
    if (!win.classList.contains("is-maximized")) {
      win.dataset.restoreTop = win.style.top;
      win.dataset.restoreLeft = win.style.left;
    }
    win.classList.toggle("is-maximized");
    if (!win.classList.contains("is-maximized")) {
      win.style.top = win.dataset.restoreTop || "";
      win.style.left = win.dataset.restoreLeft || "";
    }
    focusWindow(win);
  }

  document.addEventListener("click", (event) => {
    const openControl = event.target.closest("[data-open]");
    if (openControl) {
      openWindow(openControl.dataset.open);
      return;
    }

    const win = event.target.closest(".app-window");
    if (win) focusWindow(win);

    if (!event.target.closest("#start-menu") && !event.target.closest("#start-button")) {
      closeStartMenu();
    }
  });

  document.querySelectorAll("[data-minimize]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      minimizeWindow(button.closest(".app-window"));
    });
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      closeWindow(button.closest(".app-window"));
    });
  });

  document.querySelectorAll("[data-maximize]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMaximize(button.closest(".app-window"));
    });
  });

  document.querySelectorAll(".title-bar.drag-handle").forEach((handle) => {
    handle.addEventListener("dblclick", () => toggleMaximize(handle.closest(".app-window")));
    handle.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".title-bar-controls")) return;
      const win = handle.closest(".app-window");
      if (win.classList.contains("is-maximized") || window.innerWidth <= 760) return;
      focusWindow(win);

      const rect = win.getBoundingClientRect();
      const desktopRect = document.querySelector(".desktop").getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      handle.setPointerCapture(event.pointerId);

      const move = (moveEvent) => {
        const maxLeft = Math.max(0, desktopRect.width - rect.width);
        const maxTop = Math.max(0, desktopRect.height - 28);
        const left = Math.min(maxLeft, Math.max(0, moveEvent.clientX - desktopRect.left - offsetX));
        const top = Math.min(maxTop, Math.max(0, moveEvent.clientY - desktopRect.top - offsetY));
        win.style.left = `${left}px`;
        win.style.top = `${top}px`;
      };

      const stop = () => {
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", stop);
        handle.removeEventListener("pointercancel", stop);
      };

      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", stop);
      handle.addEventListener("pointercancel", stop);
    });
  });

  startButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const open = startMenu.classList.toggle("is-open");
    startMenu.setAttribute("aria-hidden", String(!open));
    startButton.classList.toggle("is-active", open);
    startButton.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".news-item").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".news-item").forEach((other) => { other.classList.remove("is-selected"); other.setAttribute("aria-pressed", "false"); });
      document.querySelectorAll(".news-panel").forEach((panel) => panel.classList.remove("is-active"));
      item.classList.add("is-selected");
      item.setAttribute("aria-pressed", "true");
      document.getElementById(item.dataset.news).classList.add("is-active");
    });
  });

  document.getElementById("shutdown-button").addEventListener("click", () => {
    closeStartMenu();
    aboutDialog.classList.add("is-open");
    aboutDialog.setAttribute("aria-hidden", "false");
    aboutDialog.setAttribute("role", "dialog");
    aboutDialog.setAttribute("aria-modal", "true");
    aboutDialog.setAttribute("aria-label", "About this site");
    document.getElementById("about-close").focus();
  });

  function closeAbout() {
    const wasOpen = aboutDialog.classList.contains("is-open");
    aboutDialog.classList.remove("is-open");
    aboutDialog.setAttribute("aria-hidden", "true");
    if (wasOpen) startButton.focus();
  }

  document.getElementById("about-close").addEventListener("click", closeAbout);
  document.getElementById("about-ok").addEventListener("click", closeAbout);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab" && aboutDialog.classList.contains("is-open")) {
      const controls = [...aboutDialog.querySelectorAll("button")];
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1).focus(); }
      if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus(); }
    }
    if (event.key === "Escape") {
      closeStartMenu();
      if (aboutDialog.classList.contains("is-open")) closeAbout();
      else if (document.activeElement.closest(".app-window")) closeWindow(document.activeElement.closest(".app-window"));
    }
  });

  document.addEventListener("academic-language-change", () => {
    updateTaskButtonLabels();
    setClock();
  });

  windows.filter((win) => win.classList.contains("is-open")).forEach((win) => {
    ensureTaskButton(win);
    focusWindow(win);
  });

  document.querySelectorAll("[data-copy-link]").forEach(button => button.addEventListener("click", async () => {
    const win = button.closest(".app-window");
    const hash = location.hash.startsWith("#pub-") && win.id === "publications-window" ? location.hash : "#" + routeFor(win);
    const url = "https://jiaying.minions.cyou/" + hash;
    try { await navigator.clipboard.writeText(url); notify("Link copied", "链接已复制"); }
    catch { notify("Copy this address: " + url, "请复制此地址：" + url); }
  }));
  document.querySelectorAll("[data-print]").forEach(button => button.addEventListener("click", () => { openWindow("cv-window"); window.print(); }));
  followRoute();
  setClock();
  window.setInterval(setClock, 60000);
})();
