/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Topic } from '../types';

export const TOPICS: Topic[] = [
  {
    id: 'algebra-basics',
    category: 'Algebra',
    title: 'Algebraic Basics',
    description: 'Master the fundamentals of variables, expressions, and basic manipulation.',
    concepts: [
      {
        id: 'distributive-law',
        title: 'The Distributive Law',
        content: `
The distributive law states that multiplying a sum by a number gives the same result as multiplying each addend separately by the number and then adding the products together.

$$a(b + c) = ab + ac$$

### Example:
$$3(x + 5) = 3x + 15$$
        `
      },
      {
        id: 'factorization',
        title: 'Basic Factorization',
        content: `
Factorization is the reverse of expansion. It involves taking out common factors from expressions.

$$ab + ac = a(b + c)$$

### Example:
$$4x + 12 = 4(x + 3)$$
        `
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'Expand the expression $5(2a - 3)$.',
        options: ['$10a - 15$', '$10a + 15$', '$7a - 3$', '$10a - 3$'],
        correctAnswer: '$10a - 15$',
        explanation: 'Using the distributive law, $5 \\times 2a = 10a$ and $5 \\times (-3) = -15$. So, $5(2a - 3) = 10a - 15$.'
      }
    ]
  },
  {
    id: 'trigonometry',
    category: 'Trigonometry',
    title: 'Trigonometry Ratios',
    description: 'Learn about Sine, Cosine, and Tangent in right-angled triangles.',
    concepts: [
      {
        id: 'soh-cah-toa',
        title: 'SOH CAH TOA',
        content: `
In a right-angled triangle, the primary ratios are defined as:

- **Sine (Sin)**: $\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}$ (SOH)
- **Cosine (Cos)**: $\\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}$ (CAH)
- **Tangent (Tan)**: $\\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}$ (TOA)
        `
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'In a right-angled triangle, if the opposite side is 3cm and the hypotenuse is 5cm, what is $\\sin(\\theta)$?',
        options: ['0.6', '0.8', '1.33', '0.75'],
        correctAnswer: '0.6',
        explanation: '$\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} = \\frac{3}{5} = 0.6$.'
      }
    ]
  },
  {
    id: 'quadratic-equations',
    category: 'Algebra',
    title: 'Quadratic Equations',
    description: 'Solving equations of the form $ax^2 + bx + c = 0$.',
    concepts: [
      {
        id: 'quadratic-formula',
        title: 'The Quadratic Formula',
        content: `
For any quadratic equation $ax^2 + bx + c = 0$, the roots can be found using:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

The term $b^2 - 4ac$ is called the **discriminant**.
- If $D > 0$: Two distinct real roots.
- If $D = 0$: One real root (repeated).
- If $D < 0$: No real roots.
        `
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'What is the discriminant of $x^2 - 4x + 4 = 0$?',
        options: ['0', '8', '16', '-8'],
        correctAnswer: '0',
        explanation: '$a=1, b=-4, c=4$. $D = b^2 - 4ac = (-4)^2 - 4(1)(4) = 16 - 16 = 0$.'
      }
    ]
  },
  {
    id: 'geometry-properties',
    category: 'Geometry',
    title: 'Circle Properties',
    description: 'Understand the geometric properties of circles and tangents.',
    concepts: [
      {
        id: 'angle-in-semicircle',
        title: 'Angle in a Semicircle',
        content: `
An angle subtended at the circumference by the diameter of a circle is always a right angle ($90^\\circ$).

### Tangent Properties
- A tangent to a circle is perpendicular to the radius at the point of contact.
- Tangents from an external point to a circle are equal in length.
        `
      }
    ],
    questions: [
      {
        id: 'q1',
        text: 'If $AB$ is the diameter of a circle and $C$ is a point on the circumference, what is the value of $\\angle ACB$?',
        options: ['$90^\\circ$', '$180^\\circ$', '$45^\\circ$', '$60^\\circ$'],
        correctAnswer: '$90^\\circ$',
        explanation: 'By the property of angles in a semicircle, $\\angle ACB$ is always $90^\\circ$.'
      }
    ]
  }
];
