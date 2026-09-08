import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/types";

const styles = StyleSheet.create({
  heading1: { fontSize: 18, fontWeight: "bold", marginTop: 16, marginBottom: 8, color: "#065f46" },
  heading2: { fontSize: 15, fontWeight: "bold", marginTop: 12, marginBottom: 6, color: "#047857" },
  heading3: { fontSize: 13, fontWeight: "bold", marginTop: 10, marginBottom: 4, color: "#059669" },
  paragraph: { fontSize: 10, marginBottom: 6, lineHeight: 1.5 },
  bold: { fontWeight: "bold" },
  bullet: { fontSize: 10, marginBottom: 4, paddingLeft: 16, lineHeight: 1.5 },
  tableHeader: { backgroundColor: "#d1fae5", fontWeight: "bold", fontSize: 9, padding: 4 },
  tableCell: { fontSize: 9, padding: 4, border: "0.5 solid #d1d5db" },
  tableRow: { flexDirection: "row" },
  table: { marginBottom: 10 },
  separator: { borderBottom: "1 solid #d1d5db", marginVertical: 8 },
});

type InlineToken = { text: string; bold: boolean };

function parseInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  const regex = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: text.slice(lastIndex, match.index), bold: false });
    }
    tokens.push({ text: match[1], bold: true });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    tokens.push({ text: text.slice(lastIndex), bold: false });
  }

  return tokens.length > 0 ? tokens : [{ text, bold: false }];
}

function renderInlineText(text: string, baseStyle: Style, key: string): React.ReactNode {
  const tokens = parseInline(text);
  return (
    <Text key={key} style={baseStyle}>
      {tokens.map((token, i) =>
        token.bold ? (
          <Text key={i} style={styles.bold}>{token.text}</Text>
        ) : (
          <Text key={i}>{token.text}</Text>
        )
      )}
    </Text>
  );
}

function parseMarkdownTable(lines: string[]): string[][] {
  return lines
    .filter((line) => !line.match(/^\|[\s-:|]+\|$/))
    .map((line) =>
      line
        .split("|")
        .slice(1, -1)
        .map((cell) => cell.trim())
    );
}

export function renderMarkdownToPDFElements(markdown: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const lines = markdown.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("# ")) {
      elements.push(
        <Text key={i} style={styles.heading1}>{line.slice(2).trim()}</Text>
      );
    } else if (line.startsWith("## ")) {
      elements.push(
        <Text key={i} style={styles.heading2}>{line.slice(3).trim()}</Text>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <Text key={i} style={styles.heading3}>{line.slice(4).trim()}</Text>
      );
    } else if (line.match(/^[-*] /)) {
      elements.push(
        <Text key={i} style={styles.bullet}>{"\u2022  " + line.slice(2).trim()}</Text>
      );
    } else if (line.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      i--;

      const rows = parseMarkdownTable(tableLines);
      if (rows.length > 0) {
        const colCount = rows[0].length;
        const colWidth = Math.floor((520 - 20) / colCount);

        elements.push(
          <View key={`table-${i}`} style={styles.table}>
            <View style={styles.tableRow}>
              {rows[0].map((cell, ci) => (
                <View key={ci} style={[styles.tableHeader, { width: colWidth }]}>
                  <Text>{cell}</Text>
                </View>
              ))}
            </View>
            {rows.slice(1).map((row, ri) => (
              <View key={ri} style={styles.tableRow}>
                {row.map((cell, ci) => (
                  <View key={ci} style={[styles.tableCell, { width: colWidth }]}>
                    <Text>{cell}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        );
      }
    } else if (line.trim() === "---") {
      elements.push(<View key={i} style={styles.separator} />);
    } else if (line.trim() !== "") {
      elements.push(renderInlineText(line.trim(), styles.paragraph, `p-${i}`));
    }

    i++;
  }

  return elements;
}
