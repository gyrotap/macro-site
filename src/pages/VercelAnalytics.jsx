import React from 'react';
import { CodeBlock, Code } from '@/components/ui/codeblock';

const VercelAnalytics = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <h1>Getting started with Vercel Web Analytics</h1>
        
        <p>
          This guide will help you get started with using Vercel Web Analytics on your project, 
          showing you how to enable it, add the package to your project, deploy your app to Vercel, 
          and view your data in the dashboard.
        </p>
        
        <p className="font-semibold">
          Select your framework to view instructions on using the Vercel Web Analytics in your project.
        </p>

        <h2>Prerequisites</h2>
        
        <ul>
          <li>
            A Vercel account. If you don't have one, you can{' '}
            <a href="https://vercel.com/signup" target="_blank" rel="noopener noreferrer">
              sign up for free
            </a>.
          </li>
          <li>
            A Vercel project. If you don't have one, you can{' '}
            <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer">
              create a new project
            </a>.
          </li>
          <li>
            The Vercel CLI installed. If you don't have it, you can install it using the following command:
            <CodeBlock>
              <Code tab="pnpm">{`bash
pnpm i vercel
`}</Code>
              <Code tab="yarn">{`bash
yarn i vercel
`}</Code>
              <Code tab="npm">{`bash
npm i vercel
`}</Code>
              <Code tab="bun">{`bash
bun i vercel
`}</Code>
            </CodeBlock>
          </li>
        </ul>

        <h3>Enable Web Analytics in Vercel</h3>
        <p>
          On the <a href="/dashboard">Vercel dashboard</a>, select your Project and then click the{' '}
          <strong>Analytics</strong> tab and click <strong>Enable</strong> from the dialog.
        </p>
        <blockquote>
          <p>
            <strong>💡 Note:</strong> Enabling Web Analytics will add new routes (scoped at{' '}
            <code>/_vercel/insights/*</code>) after your next deployment.
          </p>
        </blockquote>

        <h3>Add @vercel/analytics to your project</h3>
        <p>
          Using the package manager of your choice, add the <code>@vercel/analytics</code> package to your project:
        </p>
        <CodeBlock>
          <Code tab="pnpm">{`bash
pnpm i @vercel/analytics
`}</Code>
          <Code tab="yarn">{`bash
yarn i @vercel/analytics
`}</Code>
          <Code tab="npm">{`bash
npm i @vercel/analytics
`}</Code>
          <Code tab="bun">{`bash
bun i @vercel/analytics
`}</Code>
        </CodeBlock>

        <h2>Framework-Specific Instructions</h2>

        <h3>Next.js (Pages Directory)</h3>
        <p>
          The <code>Analytics</code> component is a wrapper around the tracking script, 
          offering more seamless integration with Next.js, including route support.
        </p>
        <p>If you are using the <code>pages</code> directory, add the following code to your main app file:</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">TypeScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">JavaScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { Analytics } from "@vercel/analytics/next";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}

export default MyApp;`}</code>
            </pre>
          </div>
        </div>

        <h3>Next.js (App Directory)</h3>
        <p>
          The <code>Analytics</code> component is a wrapper around the tracking script, 
          offering more seamless integration with Next.js, including route support.
        </p>
        <p>Add the following code to the root layout:</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">TypeScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">JavaScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}`}</code>
            </pre>
          </div>
        </div>

        <h3>Remix</h3>
        <p>
          The <code>Analytics</code> component is a wrapper around the tracking script, 
          offering a seamless integration with Remix, including route detection.
        </p>
        <p>Add the following code to your root file:</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">TypeScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Analytics } from "@vercel/analytics/remix";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Analytics />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}`}</code>
            </pre>
          </div>
        </div>

        <h3>Nuxt</h3>
        <p>
          The <code>Analytics</code> component is a wrapper around the tracking script, 
          offering more seamless integration with Nuxt, including route support.
        </p>
        <p>Add the following code to your main component:</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">TypeScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <Analytics />
  <NuxtPage />
</template>`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">JavaScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`<script setup>
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <Analytics />
  <NuxtPage />
</template>`}</code>
            </pre>
          </div>
        </div>

        <h3>SvelteKit</h3>
        <p>
          The <code>injectAnalytics</code> function is a wrapper around the tracking script, 
          offering more seamless integration with SvelteKit, including route support.
        </p>
        <p>Add the following code to the main layout:</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">TypeScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { dev } from "$app/environment";
import { injectAnalytics } from "@vercel/analytics/sveltekit";

injectAnalytics({ mode: dev ? "development" : "production" });`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">JavaScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { dev } from "$app/environment";
import { injectAnalytics } from "@vercel/analytics/sveltekit";

injectAnalytics({ mode: dev ? "development" : "production" });`}</code>
            </pre>
          </div>
        </div>

        <h3>Astro</h3>
        <p>
          The <code>Analytics</code> component is a wrapper around the tracking script, 
          offering more seamless integration with Astro, including route support.
        </p>
        <p>Add the following code to your base layout:</p>
        
        <div className="space-y-4">
          <div>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`---
import Analytics from '@vercel/analytics/astro';
{/* ... */}
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- ... -->
    <Analytics />
  </head>
  <body>
    <slot />
  </body>
</html>`}</code>
            </pre>
          </div>
        </div>

        <blockquote>
          <p>
            The <code>Analytics</code> component is available in version <code>@vercel/analytics@1.4.0</code> and later.
            If you are using an earlier version, you must configure the <code>webAnalytics</code> property 
            of the Vercel adapter in your <code>astro.config.mjs</code> file as shown in the code below.
            For further information, see the{' '}
            <a href="https://docs.astro.build/en/guides/integrations-guide/vercel/#webanalytics" target="_blank" rel="noopener noreferrer">
              Astro adapter documentation
            </a>.
          </p>
        </blockquote>

        <div className="space-y-4">
          <div>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true, // set to false when using @vercel/analytics@1.4.0
    },
  }),
});`}</code>
            </pre>
          </div>
        </div>

        <h3>Create React App</h3>
        <p>
          The <code>Analytics</code> component is a wrapper around the tracking script, 
          offering more seamless integration with React.
        </p>
        <blockquote>
          <p>
            <strong>💡 Note:</strong> When using the plain React implementation, there is no route support.
          </p>
        </blockquote>
        <p>Add the following code to the main app file:</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">TypeScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div>
      {/* ... */}
      <Analytics />
    </div>
  );
}`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">JavaScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div>
      {/* ... */}
      <Analytics />
    </div>
  );
}`}</code>
            </pre>
          </div>
        </div>

        <h3>Vue</h3>
        <p>
          The <code>Analytics</code> component is a wrapper around the tracking script, 
          offering more seamless integration with Vue.
        </p>
        <blockquote>
          <p>
            <strong>💡 Note:</strong> Route support is automatically enabled if you're using <code>vue-router</code>.
          </p>
        </blockquote>
        <p>Add the following code to your main component:</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">TypeScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <!-- your content -->
</template>`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">JavaScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`<script setup>
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <!-- your content -->
</template>`}</code>
            </pre>
          </div>
        </div>

        <h3>Plain HTML</h3>
        <p>For plain HTML sites, you can add the following script to your <code>.html</code> files:</p>
        
        <div className="space-y-4">
          <div>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`<script>
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>`}</code>
            </pre>
          </div>
        </div>

        <blockquote>
          <p>
            <strong>💡 Note:</strong> When using the HTML implementation, there is no need to install the{' '}
            <code>@vercel/analytics</code> package. However, there is no route support.
          </p>
        </blockquote>

        <h3>Other Frameworks</h3>
        <p>
          Import the <code>inject</code> function from the package, which will add the tracking script 
          to your app. <strong>This should only be called once in your app, and must run in the client</strong>.
        </p>
        <blockquote>
          <p>
            <strong>💡 Note:</strong> There is no route support with the <code>inject</code> function.
          </p>
        </blockquote>
        <p>Add the following code to your main app file:</p>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-2">TypeScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { inject } from "@vercel/analytics";

inject();`}</code>
            </pre>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">JavaScript:</p>
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm font-mono">{`import { inject } from "@vercel/analytics";

inject();`}</code>
            </pre>
          </div>
        </div>

        <h3>Deploy your app to Vercel</h3>
        <p>Deploy your app using the following command:</p>
        
        <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
          <code className="text-sm font-mono">vercel deploy</code>
        </pre>

        <p>
          If you haven't already, we also recommend{' '}
          <a href="/docs/git#deploying-a-git-repository" target="_blank" rel="noopener noreferrer">
            connecting your project's Git repository
          </a>, which will enable Vercel to deploy your latest commits to main without terminal commands.
        </p>

        <p>Once your app is deployed, it will start tracking visitors and page views.</p>

        <blockquote>
          <p>
            <strong>💡 Note:</strong> If everything is set up properly, you should be able to see a Fetch/XHR
            request in your browser's Network tab from <code>/_vercel/insights/view</code> when you
            visit any page.
          </p>
        </blockquote>

        <h3>View your data in the dashboard</h3>
        <p>Once your app is deployed, and users have visited your site, you can view your data in the dashboard.</p>

        <p>
          To do so, go to your <a href="/dashboard">dashboard</a>, select your project, 
          and click the <strong>Analytics</strong> tab.
        </p>

        <p>
          After a few days of visitors, you'll be able to start exploring your data by viewing and{' '}
          <a href="/docs/analytics/filtering" target="_blank" rel="noopener noreferrer">filtering</a> the panels.
        </p>

        <p>
          Users on Pro and Enterprise plans can also add{' '}
          <a href="/docs/analytics/custom-events" target="_blank" rel="noopener noreferrer">custom events</a>{' '}
          to their data to track user interactions such as button clicks, form submissions, or purchases.
        </p>

        <p>
          Learn more about how Vercel supports{' '}
          <a href="/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
            privacy and data compliance standards
          </a>{' '}
          with Vercel Web Analytics.
        </p>

        <h2>Next steps</h2>
        <p>Now that you have Vercel Web Analytics set up, you can explore the following topics to learn more:</p>
        
        <ul>
          <li>
            <a href="/docs/analytics/package" target="_blank" rel="noopener noreferrer">
              Learn how to use the @vercel/analytics package
            </a>
          </li>
          <li>
            <a href="/docs/analytics/custom-events" target="_blank" rel="noopener noreferrer">
              Learn how to set update custom events
            </a>
          </li>
          <li>
            <a href="/docs/analytics/filtering" target="_blank" rel="noopener noreferrer">
              Learn about filtering data
            </a>
          </li>
          <li>
            <a href="/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">
              Read about privacy and compliance
            </a>
          </li>
          <li>
            <a href="/docs/analytics/limits-and-pricing" target="_blank" rel="noopener noreferrer">
              Explore pricing
            </a>
          </li>
          <li>
            <a href="/docs/analytics/troubleshooting" target="_blank" rel="noopener noreferrer">
              Troubleshooting
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VercelAnalytics;
