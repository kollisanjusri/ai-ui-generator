export type ComponentNode = {
  type:
    | "Button"
    | "Card"
    | "Input"
    | "Table"
    | "Modal"
    | "Sidebar"
    | "Navbar"
    | "Chart";
  props?: Record<string, any>;
  children?: ComponentNode[];
};

export type UIPlan = {
  layout: string;
  components: ComponentNode[];
  modificationType: "create" | "update";
};
