/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/svelte';
import { screen, waitForElementToBeRemoved } from '@testing-library/dom';

import App from './App.svelte';
import "isomorphic-fetch";

const TOTAL_TICKET_COUNT = 101;
const PAGE_2_LOWER_BOUND = 26;
const SAMPLE_TICKET_SUBJECT = "Sample ticket: Meet the ticket";
const SAMPLE_TICKET_DESC = "Hi there, I’m sending an email because I’m having a problem setting up your new product. Can you help me troubleshoot? Thanks, The Customer";


/**
 * Simple test to ensure website loads
 */
test("website loads", () =>
{
    render(App);
    var status = screen.getByText("Zendesk Ticket Viewer");


    expect(status).toBeInTheDocument();
});


/**
 * Ensures a loading message is displayed.
 */
test("attempts to load tickets", () =>
{
    render(App);


    var status = screen.getByText("Loading, please wait...");
    expect(status).toBeInTheDocument();
});

/**
 * Ensures table loads.
 */
test("loads table", async () =>
{
    render(App);

    const status = await screen.findByTestId("status");
    expect(status).toBeInTheDocument();

});


/**
 * Ensures the right number of tickets were loaded.
 */
test("correct ticket count", done =>
{
    render(App);

    // Wait for transistion to finish
    waitForElementToBeRemoved(document.querySelector(".transistion-message")).then(() =>
    {
        try {
            let count = document.getElementById("total-ticket-count").innerHTML;
            expect(count).toEqual(TOTAL_TICKET_COUNT.toString());
            done();
        } catch (error) {
            done(error);
        }
    });
});


/**
 * Ensures page advances
 */
test("next page", async () =>
{
    render(App);

    // Click next page button
    let nextButton = await screen.findByTestId("button-next");
    await fireEvent.click(nextButton);

    // See if display count updates
    const lowerBound = await screen.findByTestId("lower-bound");
    expect(lowerBound.innerHTML).toEqual(PAGE_2_LOWER_BOUND.toString());
});


/**
 * Ensures clicking a row opens that ticket
 */
test("ticket details modal updates", async () =>
{
    render(App);

    // Click on sample ticket
    const sampleSubject = await screen.findByText(SAMPLE_TICKET_SUBJECT);
    const sampleRow = sampleSubject.parentElement;

    // Check if description was loaded
    await fireEvent.click(sampleRow);
    const desc = await screen.findByText(SAMPLE_TICKET_DESC);

    expect(desc).toBeInTheDocument();
});

