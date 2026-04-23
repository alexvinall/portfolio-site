const projects = [
  {
    title: "FIRE Progress Tracker",
    category: "finance",
    categoryLabel: "Personal Finance",
    description: "UK-focused FIRE progress tracker based on SIPP and S&S ISAs",
    tags: ["Finance", "FIRE"],
    url: "https://alexvinall.github.io/fire-progress-tracker/"
  },
  {
    title: "32",
    category: "family",
    categoryLabel: "Family Projects",
    description: "Simple version of once-popular game 2048 where the goal is to reach 32",
    tags: ["Games", "Family"],
    url: "https://alexvinall.github.io/2048/"
  },
  {
    title: "Rescue Hero",
    category: "family",
    categoryLabel: "Family Projects",
    description: "A make-believe game you can play at home with your kids to be a hero!",
    tags: ["Family", "Games"],
    url: "https://alexvinall.github.io/rescue-hero/"
  },
  {
    title: "Pregnancy Calendar",
    category: "personal",
    categoryLabel: "Personal",
    description:
      "A personal and private pregnancy calendar. Input your current stage of pregnancy (weeks and days) to generate a downloadable pregnancy calendar showing the start of each week. You can import this into Google, iOS and other calendars.",
    tags: ["Family", "Pregnancy", "Calendar"],
    url: "https://alexvinall.github.io/pregnancy-calendar/"
  },
  {
    title: "Recipes",
    category: "personal",
    categoryLabel: "Personal",
    description: "Recipes we cook regularly at home for our family.",
    tags: ["Cooking", "Family"],
    url: "https://alexvinall.github.io/recipes/"
  }
];

const grid = document.getElementById("projectGrid");
const template = document.getElementById("projectTemplate");
const filterButtons = document.querySelectorAll(".filter-button");

function renderProjects(activeFilter = "all") {
  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  grid.replaceChildren();

  filtered.forEach((project) => {
    const fragment = template.content.cloneNode(true);
    const card = fragment.querySelector(".project-card");

    card.classList.add(project.category);
    card.href = project.url;
    card.setAttribute("aria-label", `Open ${project.title} in a new tab`);

    fragment.querySelector(".project-category").textContent = project.categoryLabel;
    fragment.querySelector(".project-title").textContent = project.title;
    fragment.querySelector(".project-description").textContent = project.description;

    const tagList = fragment.querySelector(".tag-list");
    project.tags.forEach((tag) => {
      const listItem = document.createElement("li");
      listItem.textContent = tag;
      tagList.appendChild(listItem);
    });

    grid.appendChild(fragment);
  });
}

function setActiveFilter(nextFilter) {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === nextFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  grid.classList.add("hidden");
  requestAnimationFrame(() => {
    renderProjects(nextFilter);
    grid.classList.remove("hidden");
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveFilter(button.dataset.filter);
  });
});

renderProjects();
