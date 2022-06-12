import { render, screen, act, waitFor } from '@testing-library/react';
import App from '.';
import userEvent from '@testing-library/user-event';

test('renders car detail', async () => {
  render(<App />);
  const inputElement = screen.getByTestId("registration-input");
  userEvent.type(inputElement, "FV57WPF")

  const searchButton = screen.getByTestId("search-button");

  act(() => {
    searchButton.click();
  });

  await waitFor(() => {
    expect(screen.getByTestId("data-card-container")).toBeInTheDocument()
  }, { timeout: 2000 })

  const dataCards = screen.getAllByTestId("data-card");
  expect(dataCards.length).toBe(6)
});
