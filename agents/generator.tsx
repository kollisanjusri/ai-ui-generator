"use client";

import React from "react";

import { Button } from "@/components/system/Button";
import { Card } from "@/components/system/Card";
import { Input } from "@/components/system/Input";
import { Table } from "@/components/system/Table";
import { Modal } from "@/components/system/Modal";
import { Sidebar } from "@/components/system/Sidebar";
import { Navbar } from "@/components/system/Navbar";
import { Chart } from "@/components/system/Chart";

import { ComponentNode } from "@/types/plan";

const allowedComponents = [
  "Button",
  "Card",
  "Input",
  "Table",
  "Modal",
  "Sidebar",
  "Navbar",
  "Chart",
];

function renderComponent(node: ComponentNode): React.ReactNode {
  if (!node || !allowedComponents.includes(node.type)) return null;

  const { type, props = {}, children = [] } = node;

  const renderedChildren = children.map((child, index) => (
    <React.Fragment key={index}>
      {renderComponent(child)}
    </React.Fragment>
  ));

  switch (type) {
    case "Button":
      return <Button {...props}>{props.label || "Button"}</Button>;

    case "Card":
      return <Card {...props}>{renderedChildren}</Card>;

    case "Input":
      return <Input {...props} />;

    case "Table":
      if (!props.columns || !props.data) {
        return (
          <div className="text-red-500 text-sm border border-red-300 p-2 rounded">
            Invalid Table: missing columns or data
          </div>
        );
      }
      return <Table columns={props.columns} data={props.data} />;

    case "Modal":
      return (
        <Modal
          title={props.title || "Modal"}
          isOpen={true}
          onClose={() => {
            console.log("Modal closed");
          }}
        >
          {renderedChildren}
        </Modal>
      );

    case "Sidebar":
      return <Sidebar {...props} />;

    case "Navbar":
      return <Navbar {...props} />;

    case "Chart":
      return (
        <Chart
          data={
            props.data || [
              { label: "Jan", value: 40 },
              { label: "Feb", value: 70 },
              { label: "Mar", value: 55 },
            ]
          }
        />
      );

    default:
      return null;
  }
}

export function generateUI(plan: ComponentNode[]) {
  if (!Array.isArray(plan)) return null;

  return (
    <>
      {plan.map((node, index) => (
        <React.Fragment key={index}>
          {renderComponent(node)}
        </React.Fragment>
      ))}
    </>
  );
}
