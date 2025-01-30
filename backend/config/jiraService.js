import 'dotenv/config';
import axios from 'axios';

const {
  JIRA_HOST,
  JIRA_EMAIL,
  JIRA_API_TOKEN,
  JIRA_PROJECT_KEY,
} = process.env;

// 1) Create a base64 token for Basic Auth
const authString = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

// 2) Pre-configure an axios instance for JIRA
const jiraAxios = axios.create({
  baseURL: `${JIRA_HOST}/rest/api/3`,
  headers: {
    Authorization: `Basic ${authString}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Create a JIRA issue in the specified project
 * @param {Object} issueData
 * @param {string} issueData.summary - Issue summary/title
 * @param {string} issueData.description - Detailed issue description
 * @param {string} issueData.issueType - e.g. "Task", "Bug", "Story"
 */
export async function createJiraIssue({ summary, description, issueType = 'Task' }) {
  try {
    const response = await jiraAxios.post('/issue', {
      fields: {
        project: { key: JIRA_PROJECT_KEY },
        summary,
        description,
        issuetype: { name: issueType },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating JIRA issue:', error?.response?.data || error.message);
    throw error;
  }
}
