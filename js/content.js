/* content.js - load static content from JSON and render it into the page */
(function () {
  const files = {
    navigation: "data/navigation.json",
    hero: "data/hero.json",
    projects: "data/projects-section.json",
    skills: "data/skills.json",
    about: "data/about.json",
    contact: "data/contact.json",
  };

  const create = (tag, className, text) => {
    const el = document.createElement(tag);

    if (className) {
      el.className = className;
    }

    if (text !== undefined) {
      el.textContent = text;
    }

    return el;
  };

  async function loadJson(path) {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load ${path}: ${response.status}`);
    }

    return response.json();
  }

  function renderLinks(target, items) {
    if (!target) return;

    target.replaceChildren(
      ...(items || []).map((item) => {
        const link = create("a", "nav__link", item.label);
        link.href = item.href;
        return link;
      })
    );
  }

  function renderNav(data) {
    renderLinks(document.getElementById("nav-left"), data.left);
    renderLinks(document.getElementById("nav-right"), data.right);

    const logo = document.getElementById("nav-logo");
    if (!logo || !data.logo) return;

    const link = create("a", "nav__link", data.logo.label);
    link.href = data.logo.href;
    logo.replaceChildren(link);
  }

  function renderHero(data) {
    const intro = document.getElementById("home-intro");
    const title = document.getElementById("home-title");
    const description = document.getElementById("home-description");

    if (intro) intro.textContent = data.intro || "";
    if (description) description.textContent = data.description || "";

    if (!title) return;

    const lines = data.titleLines || [];
    const nodes = [];
    lines.forEach((line, index) => {
      nodes.push(document.createTextNode(line));
      if (index < lines.length - 1) {
        nodes.push(document.createElement("br"));
      }
    });

    title.replaceChildren(...nodes);
  }

  function renderParagraphs(target, paragraphs) {
    if (!target) return;

    target.replaceChildren(
      ...(paragraphs || []).map((text) => create("p", "", text))
    );
  }

  function renderProjectsSection(data) {
    const header = document.getElementById("projects-header");
    const intro = document.getElementById("projects-intro");
    const searchLabel = document.getElementById("projects-search-label");
    const search = document.getElementById("projects-search");
    const countText = document.getElementById("projects-count-text");

    if (header) header.textContent = data.header || "";
    if (searchLabel) searchLabel.textContent = data.searchLabel || "";
    if (search) search.placeholder = data.searchPlaceholder || "";

    if (countText) {
      countText.dataset.singular = data.countLabel?.singular || "project";
      countText.dataset.plural = data.countLabel?.plural || "projects";
      countText.textContent = countText.dataset.plural;
    }

    renderParagraphs(intro, data.intro);
  }

  function renderSkills(data) {
    const header = document.getElementById("skills-header");
    const intro = document.getElementById("skills-intro");
    const groups = document.getElementById("skills-groups");

    if (header) header.textContent = data.header || "";

    if (intro) {
      const nodes = [];
      if (data.intro?.heading) {
        nodes.push(create("h2", "", data.intro.heading));
      }

      (data.intro?.paragraphs || []).forEach((text) => {
        nodes.push(create("p", "", text));
      });

      intro.replaceChildren(...nodes);
    }

    if (!groups) return;

    groups.replaceChildren(
      ...(data.groups || []).map((group) => {
        const card = create("div", "skill-group");
        const pills = create("div", "skill-pills");

        pills.replaceChildren(
          ...(group.pills || []).map((pill) => create("span", "skill-pill", pill))
        );

        card.replaceChildren(
          create("h3", "", group.title || ""),
          create("p", "skill-note", group.note || ""),
          pills
        );

        return card;
      })
    );
  }

  function renderAboutColumn(target, column) {
    if (!target || !column) return;

    const nodes = [create("h2", "", column.title || "")];
    (column.paragraphs || []).forEach((text) => {
      nodes.push(create("p", "", text));
    });

    target.replaceChildren(...nodes);
  }

  function renderAbout(data) {
    const header = document.getElementById("about-header");
    if (header) header.textContent = data.header || "";

    renderAboutColumn(document.getElementById("about-left"), data.columns?.[0]);
    renderAboutColumn(document.getElementById("about-right"), data.columns?.[1]);
  }

  function renderContact(data) {
    const header = document.getElementById("contact-header");
    const intro = document.getElementById("contact-intro");
    const card = document.getElementById("contact-card");

    if (header) header.textContent = data.header || "";

    if (intro) {
      const nodes = [];
      if (data.intro?.heading) {
        nodes.push(create("h2", "", data.intro.heading));
      }

      (data.intro?.paragraphs || []).forEach((text) => {
        nodes.push(create("p", "", text));
      });

      intro.replaceChildren(...nodes);
    }

    if (!card) return;

    const detailNodes = (data.details || []).map((detail) => {
      const row = create("div", "contact-row");
      const link = create("a", detail.className || "contact-link", detail.value || "");
      link.href = detail.href || "#";

      if (detail.external) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      row.replaceChildren(
        create("p", "contact-label", detail.label || ""),
        link
      );

      return row;
    });

    const actions = create("div", "contact-actions");
    actions.replaceChildren(
      ...(data.actions || []).map((action) => {
        const link = create("a", action.className || "btn", action.label || "");
        link.href = action.href || "#";

        if (action.external) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }

        return link;
      })
    );

    card.replaceChildren(...detailNodes, actions);
  }

  async function init() {
    try {
      const [navigation, hero, projects, skills, about, contact] = await Promise.all([
        loadJson(files.navigation),
        loadJson(files.hero),
        loadJson(files.projects),
        loadJson(files.skills),
        loadJson(files.about),
        loadJson(files.contact),
      ]);

      renderNav(navigation);
      renderHero(hero);
      renderProjectsSection(projects);
      renderSkills(skills);
      renderAbout(about);
      renderContact(contact);

      document.dispatchEvent(new CustomEvent("content:ready"));
    } catch (error) {
      console.error("Failed to load content", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
