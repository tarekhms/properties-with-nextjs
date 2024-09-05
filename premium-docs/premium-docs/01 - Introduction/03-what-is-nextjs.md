# What Is Next.js?

Before we get started coding, let's take a few minutes and talk about what Next.js is and why you might want to use it.

The simple definition for Next.js is a React framework for building full-stack web applications. I know that that may sound a bit confusing because it's essentially a framework within a framework. It's like framework inception. It’s best understood as a specific environment tailored for creating React applications and offering some really nice features like file-based routing, image optimization, better SEO, api routes and so on.

Traditionally, tools like Create React App or Vite with the React plugin are used to build Single Page Applications (SPAs). In these setups, all the React code you write is bundled and sent to the client-side. Next.js, on the other hand, extends the capabilities of React by offering server-side rendering, static site generation, and other powerful features out of the box, enabling you to build more robust and scalable web applications. 

## Types of Websites & Applications

So to put some of this into perspective, I want to go through 4 different types of websites and look at how they work and some of the pros and cons. 


### Pure Static Websites

Think back to when you first started learning HTML and CSS. You would create an HTML file and a CSS file and then open the HTML file in your browser. This is the simplest form of a website. Your physical HTML, CSS, and JavaScript files are sent from the server to the client and displayed in the browser.

**Advantages:**
- **Fast Load Times:** Static websites load quickly because there's no server-side processing needed on each request.
- **Good for SEO:** They are inherently SEO-friendly as content is directly present in the HTML.

**Disadvantages:**
- **Limited Interactivity:** While you can add some JavaScript for basic interactivity, complex features can be challenging.
- **Maintenance Challenges:** Scaling to many pages can lead to managing numerous physical HTML files.

---

### Single Page Applications (SPAs)

As you learned more about web development, you likely discovered JavaScript's ability to enhance interactivity. You learned things like AJAX and the Fetch API and how to update content without reloading the entire page. Frameworks like React took all that and ran with it and added something called a virtual DOM to build SPAs, which facilitate building entire applications within a single HTML file, where content is dynamically loaded and updated via client-side JavaScript.

**Advantages:**
- **Interactive User Experience:** SPAs provide seamless user interactions without full-page reloads.
- **Efficient Updates:** Only parts of the page are re-rendered, enhancing performance.

**Disadvantages:**
- **Slower Initial Load:** The browser needs to download and execute JavaScript, potentially delaying initial page display.
- **SEO Challenges:** Search engines may struggle to index content due to reliance on JavaScript for rendering.

---

### Server-Side Rendered (SSR) Applications

SSR combines the initial benefits of static websites with the interactivity of SPAs. When a user visits a URL, the server generates HTML and CSS like a static website but enhances it with JavaScript for interactivity and dynamic updates.

**Advantages:**
- **Fast Initial Load:** Users see content quickly because the server sends pre-rendered HTML.
- **SEO-Friendly:** Content is accessible to search engines since it's present in the HTML response.

**Disadvantages:**
- **Complexity:** Implementing SSR can be more challenging than SPAs due to server-side rendering requirements.
- **Server Load:** Handling SSR can increase server load, especially under high traffic.

---

### Static Site Generators (SSGs)

SSGs pre-generate all HTML and CSS at build time, removing the need for server-side rendering on each request. This approach offers the fastest possible websites but requires rebuilding and redeploying the site to update content.

**Advantages:**
- **Blazing Fast:** Sites load instantly as all content is pre-rendered.
- **Security:** Reduced attack surface since there's no server-side code running per request.

**Disadvantages:**
- **Content Updates:** Changes require rebuilding and redeploying the entire site, which may be cumbersome for frequent updates.


Next.js is both an SSR framework and a static site generator. You can choose which type of application you want to build and you can even mix and match. In our project, we'll have some pages that are server rendered and some that are statically generated.

In the next lesson, let's look at some of the specific features that Next offers.

