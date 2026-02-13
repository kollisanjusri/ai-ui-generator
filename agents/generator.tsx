import React from "react";
import { UIPlan, ComponentNode } from "@/types/plan";

import { Button } from "@/components/system/Button";
import { Card } from "@/components/system/Card";
import { Input } from "@/components/system/Input";
import { Table } from "@/components/system/Table";
import { Modal } from "@/components/system/Modal";
import { Sidebar } from "@/components/system/Sidebar";
import { Navbar } from "@/components/system/Navbar";
import { Chart } from "@/components/system/Chart";

/* =======================
   PLAN → LIVE COMPONENTS
======================= */

function renderComponent(node: ComponentNode): React.ReactNode {
  const { type, props = {}, children = [] } = node;

  const renderedChildren = children.map((child, index) => (
    <React.Fragment key={index}>
      {renderComponent(child)}
    </React.Fragment>
  ));

  switch (type) {
    case "Button":
      return <Button {...props}>{props.children}</Button>;

    case "Card":
      return <Card {...props}>{renderedChildren}</Card>;

    case "Input":
      return <Input {...props} />;

    case "Table":
      return <Table {...props} />;

    case "Modal":
      return (
        <Modal
          isOpen={props.isOpen ?? true}
          onClose={props.onClose ?? (() => {})}
          {...props}
        >
          {renderedChildren}
        </Modal>
      );

    case "Sidebar":
      return <Sidebar {...props} />;

    case "Navbar":
      return <Navbar {...props} />;

    case "Chart":
      return <Chart {...props} />;

    default:
      return null;
  }
}

export function generateUI(plan: UIPlan): React.ReactNode {
  return (
    <>
      {plan.components.map((component, index) => (
        <React.Fragment key={index}>
          {renderComponent(component)}
        </React.Fragment>
      ))}
    </>
  );
}

/* =======================
   PLAN → CODE STRING
======================= */

export function generateCodeString(plan: UIPlan): string {
  function renderNode(node: any, indent = 4): string {
    const space = " ".repeat(indent);

    const props =
      node.props && Object.keys(node.props).length
        ? " " +
          Object.entries(node.props)
            .map(([key, value]) => {
              if (typeof value === "string") {
                return `${key}="${value}"`;
              }
              return `${key}={${JSON.stringify(value)}}`;
            })
            .join(" ")
        : "";

    if (!node.children || node.children.length === 0) {
      return `${space}<${node.type}${props} />`;
    }

    const children = node.children
      .map((child: any) => renderNode(child, indent + 2))
      .join("\n");

    return `${space}<${node.type}${props}>
${children}
${space}</${node.type}>`;
  }

  return `import {
  Button,
  Card,
  Input,
  Table,
  Modal,
  Sidebar,
  Navbar,
  Chart
} from "@/components/system";

export default function GeneratedUI() {
  return (
<>
${plan.components.map((c) => renderNode(c)).join("\n")}
</>
  );
}`;
}
