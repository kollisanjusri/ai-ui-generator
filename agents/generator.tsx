"use client";

import React from "react";

import { Modal } from "@/components/system/Modal";
import { Button } from "@/components/system/Button";
import { Card } from "@/components/system/Card";
import { Input } from "@/components/system/Input";
import { Table } from "@/components/system/Table";
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

export function generateUI(
  nodes: ComponentNode[],
  isModalOpen: boolean,
  closeModal: () => void
) {
  function renderComponent(node: ComponentNode): React.ReactNode {
    if (!node || !allowedComponents.includes(node.type)) return null;

    const { type, props = {}, children = [] } = node;

    const renderedChildren = children.map((child, index) => (
      <React.Fragment key={index}>
        {renderComponent(child)}
      </React.Fragment>
    ));

    switch (type) {
      case "Modal":
        return (
          <Modal
            title={props.title || "Modal"}
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            {renderedChildren}
          </Modal>
        );

      case "Button":
        return <Button {...props}>{props.label || "Button"}</Button>;

      case "Card":
        return <Card {...props}>{renderedChildren}</Card>;

      case "Input":
        return <Input {...props} />;

      case "Table":
        return (
          <Table
            columns={props.columns || []}
            data={props.data || []}
          />
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
              ]
            }
          />
        );

      default:
        return null;
    }
  }

  return (
    <>
      {nodes.map((node, index) => (
        <React.Fragment key={index}>
          {renderComponent(node)}
        </React.Fragment>
      ))}
    </>
  );
}
