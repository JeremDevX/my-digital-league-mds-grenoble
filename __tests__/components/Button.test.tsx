import Button from "@/app/components/Button/Button";
import { PlusIcon } from "@/app/components/Icons/Icons";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("Rendu de base", () => {
  it("affiche le label correctement", () => {
    render(<Button label="Click Me" />);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("rend un élément <button>", () => {
    render(<Button label="Click Me" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});

describe("Prop `type`", () => {
  it("applique la classe primary", () => {
    render(<Button label="Click Me" type="primary" />);
    expect(screen.getByRole("button").className).toContain("primary");
  });

  it("applique la classe secondary", () => {
    render(<Button label="Click Me" type="secondary" />);
    expect(screen.getByRole("button").className).toContain("secondary");
  });

  it("applique la classe tertiary", () => {
    render(<Button label="Click Me" type="tertiary" />);
    expect(screen.getByRole("button").className).toContain("tertiary");
  });

  it("n'applique aucune classe de type si absent", () => {
    render(<Button label="Click Me" />);
    const btn = screen.getByRole("button");
    expect(btn.className).not.toContain("primary");
    expect(btn.className).not.toContain("secondary");
    expect(btn.className).not.toContain("tertiary");
  });
});

describe("Prop `fullWidth`", () => {
  it("applique la classe fullWidth si true", () => {
    render(<Button label="Click Me" fullWidth />);
    expect(screen.getByRole("button").className).toContain("fullWidth");
  });

  it("n'applique pas fullWidth si false", () => {
    render(<Button label="Click Me" fullWidth={false} />);
    expect(screen.getByRole("button").className).not.toContain("fullWidth");
  });
});

describe("Prop `disabled`", () => {
  it("désactive le bouton", () => {
    render(<Button label="Click Me" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("le bouton est actif par défaut", () => {
    render(<Button label="Click Me" />);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("ne déclenche pas onClick quand désactivé", () => {
    const handleClick = vi.fn();
    render(<Button label="Click Me" disabled onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe("Prop `onClick`", () => {
  it("appelle onClick au clic", () => {
    const handleClick = vi.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("ne lève pas d'erreur si onClick est absent", () => {
    render(<Button label="Click Me" />);
    expect(() => fireEvent.click(screen.getByRole("button"))).not.toThrow();
  });
});

describe("Prop `href`", () => {
  it("rend un lien avec le bon href", () => {
    render(<Button label="Click Me" href="/about" />);
    const link = screen.getByRole("link", { name: /click me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
  });

  it("affiche le label dans le lien", () => {
    render(<Button label="Accueil" href="/" />);
    expect(screen.getByRole("link", { name: /accueil/i })).toBeInTheDocument();
  });

  it("n'affiche pas de lien si href est absent", () => {
    render(<Button label="Click Me" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

describe("Prop `icon` et `iconPosition`", () => {
  const icon = (
    <span data-testid="icon">
      <PlusIcon />
    </span>
  );

  it("affiche l'icône à gauche (iconPosition='left')", () => {
    render(<Button label="Click Me" icon={icon} iconPosition="left" />);
    const btn = screen.getByRole("button");
    const children = Array.from(btn.childNodes);
    const iconIndex = children.findIndex(
      (n) => (n as HTMLElement).dataset?.testid === "icon"
    );
    const labelIndex = children.findIndex((n) =>
      n.textContent?.includes("Click Me")
    );
    expect(iconIndex).toBeLessThan(labelIndex);
  });

  it("affiche l'icône à droite (iconPosition='right')", () => {
    render(<Button label="Click Me" icon={icon} iconPosition="right" />);
    const btn = screen.getByRole("button");
    const children = Array.from(btn.childNodes);
    const iconIndex = children.findIndex(
      (n) => (n as HTMLElement).dataset?.testid === "icon"
    );
    const labelIndex = children.findIndex((n) =>
      n.textContent?.includes("Click Me")
    );
    expect(labelIndex).toBeLessThan(iconIndex);
  });

  it("affiche deux icônes (iconPosition='both')", () => {
    render(<Button label="Click Me" icon={icon} iconPosition="both" />);
    expect(screen.getAllByTestId("icon")).toHaveLength(2);
  });

  it("n'affiche aucune icône si icon est absent", () => {
    render(<Button label="Click Me" iconPosition="left" />);
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument();
  });
});

describe("Smoke tests", () => {
  it.each([
    ["Primary", { label: "Click Me", type: "primary" as const }],
    ["Secondary", { label: "Click Me", type: "secondary" as const }],
    ["Tertiary", { label: "Click Me", type: "tertiary" as const }],
    [
      "FullWidth",
      { label: "Click Me", type: "primary" as const, fullWidth: true },
    ],
    [
      "Disabled",
      { label: "Click Me", type: "primary" as const, disabled: true },
    ],
    ["WithHref", { label: "Click Me", href: "/about" }],
  ])("story %s se rend sans erreur", (_, props) => {
    const { container } = render(<Button {...props} />);
    expect(container).toBeTruthy();
  });
});
