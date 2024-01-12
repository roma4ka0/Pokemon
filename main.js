function createCharacter(name, healthId, progressBarId) {
  const elHP = document.getElementById(healthId);
  const elProgressBar = document.getElementById(progressBarId);

  return {
    name,
    defaultHP: 100,
    damageHP: 100,
    elHP,
    elProgressBar,
    isFighting: true,
    changeHP: function (count) {
      if (!this.isFighting) return;

      this.damageHP = Math.max(this.damageHP - count, 0);
      this.renderHP();

      if (this.damageHP === 0) {
        alert(`Бедный ${this.name} проиграл бой!`);
        this.isFighting = false;
        Array.from(document.querySelectorAll(".button")).forEach(
          (btn) => (btn.disabled = true)
        );
      }
    },
    renderHPLife: function () {
      this.elHP.textContent = `${this.damageHP} / ${this.defaultHP}`;
    },
    renderProgressBarHP: function () {
      this.elProgressBar.style.width = `${this.damageHP}%`;
    },
    renderHP: function () {
      this.renderHPLife();
      this.renderProgressBarHP();
    },
  };
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function init() {
  console.log("Почни гру!");

  const Запдос = createCharacter(
    "Запдос",
    "health-character",
    "progressbar-character"
  );
  const Бібарел = createCharacter(
    "Бібарел",
    "health-enemy",
    "progressbar-enemy"
  );

  const btnKick = document.getElementById("btn-kick");
  btnKick.addEventListener("click", () => {
    console.log("Водная струя");
    Запдос.changeHP(random(30));

  });

  const btnFire = document.getElementById("btn-fire");
  btnFire.addEventListener("click", () => {
    console.log("Грозовая волна");
    Бібарел.changeHP(random(30));
  });

  Запдос.renderHP();
  Бібарел.renderHP();
}

document.addEventListener("DOMContentLoaded", init);
