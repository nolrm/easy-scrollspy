interface ScrollSpyOptions {
  activeClass?: string;
  offset?: number;
}

class ScrollSpy {
  private navLinks: NodeListOf<Element>;
  private sections: HTMLElement[];
  private options: ScrollSpyOptions;

  constructor(navSelector: string, options: ScrollSpyOptions = {}) {
    this.navLinks = document.querySelectorAll(navSelector);
    this.sections = Array.from(this.navLinks).map(link => {
      const href = (link as HTMLAnchorElement).getAttribute("href");
      return document.querySelector(href!) as HTMLElement;
    });

    this.options = {
      activeClass: "active",
      offset: 0,
      ...options
    };

    this.init();
  }

  private init(): void {
    window.addEventListener('scroll', this.onScroll.bind(this));
    this.onScroll(); // Initial check
  }

  private onScroll(): void {
    const scrollPos = window.scrollY + (this.options.offset || 0);
    this.sections.forEach((section, index) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => link.classList.remove(this.options.activeClass!));
        this.navLinks[index].classList.add(this.options.activeClass!);
      }
    });
  }

  public destroy(): void {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }
}

export default ScrollSpy;
