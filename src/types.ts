/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TopicId = 'algebra-basics' | 'linear-equations' | 'quadratic-equations' | 'trigonometry' | 'geometry-properties' | 'statistics';

export interface Concept {
  id: string;
  title: string;
  content: string; // Markdown + LaTeX
  interactiveComponent?: string; // ID of a custom interactive widget
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface Topic {
  id: TopicId;
  title: string;
  description: string;
  concepts: Concept[];
  questions: Question[];
  category: 'Algebra' | 'Geometry' | 'Statistics' | 'Trigonometry';
}
