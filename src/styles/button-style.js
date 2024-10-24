import {css} from 'lit';

export const buttonStyles = css`
  button {
    -webkit-appearance: none;
    border-radius: 0;
    text-align: inherit;
    background: none;
    box-shadow: none;
    padding: 0;
    cursor: pointer;
    border: none;
    color: inherit;
    font: inherit;
  }

  button {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    border: 1px solid transparent;
  }

  .primary {
    color: var(--white);
    background-color: var(--blue);

    &:hover {
      opacity: 0.9;
    }
  }

  .warning {
    color: var(--white);
    background-color: var(--warning);

    &:hover {
      opacity: 0.9;
    }
  }
`;
