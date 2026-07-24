(() => {
  const windows = [...document.querySelectorAll(".app-window")];
  const startButton = document.getElementById("start-button");
  const startMenu = document.getElementById("start-menu");
  const taskButtons = document.getElementById("task-buttons");
  const clock = document.getElementById("clock");
  const aboutDialog = document.getElementById("about-dialog");
  let topZ = 20;

  function setClock() {
    const now = new Date();
    clock.dateTime = now.toISOString();
    clock.textContent = now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
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

  function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;
    win.classList.add("is-open");
    win.classList.remove("is-minimized");
    ensureTaskButton(win);
    focusWindow(win);
    closeStartMenu();
  }

  function minimizeWindow(win) {
    win.classList.remove("is-open");
    win.classList.add("is-minimized");
    const button = taskButtons.querySelector(`[data-window="${win.id}"]`);
    if (button) button.classList.remove("is-active");
  }

  function closeWindow(win) {
    win.classList.remove("is-open", "is-minimized", "is-focused", "is-maximized");
    const button = taskButtons.querySelector(`[data-window="${win.id}"]`);
    if (button) button.remove();
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
      document.querySelectorAll(".news-item").forEach((other) => other.classList.remove("is-selected"));
      document.querySelectorAll(".news-panel").forEach((panel) => panel.classList.remove("is-active"));
      item.classList.add("is-selected");
      document.getElementById(item.dataset.news).classList.add("is-active");
    });
  });

  document.getElementById("shutdown-button").addEventListener("click", () => {
    closeStartMenu();
    aboutDialog.classList.add("is-open");
    aboutDialog.setAttribute("aria-hidden", "false");
  });

  function closeAbout() {
    aboutDialog.classList.remove("is-open");
    aboutDialog.setAttribute("aria-hidden", "true");
  }

  document.getElementById("about-close").addEventListener("click", closeAbout);
  document.getElementById("about-ok").addEventListener("click", closeAbout);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeStartMenu();
      closeAbout();
    }
  });

  windows.filter((win) => win.classList.contains("is-open")).forEach((win) => {
    ensureTaskButton(win);
    focusWindow(win);
  });

  setClock();
  window.setInterval(setClock, 1000);
})();
