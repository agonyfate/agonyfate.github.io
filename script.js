async function fetchGitHubUser() {
    const username = document.getElementById("username").value;
    const userInfo = document.getElementById("user-info");
    const profilePic = document.getElementById("profile-pic");
    const name = document.getElementById("name");
    const bio = document.getElementById("bio");
    const repos = document.getElementById("repos");
    const followers = document.getElementById("followers");
    const following = document.getElementById("following");
    const profileLink = document.getElementById("profile-link");
    const loading = document.getElementById("loading");
    const reposList = document.getElementById("repos-list");

    if (!username) {
        userInfo.classList.add("hidden");
        alert("Please enter a GitHub username.");
        return;
    }

    // Show loading, hide user info
    loading.classList.remove("hidden");
    userInfo.classList.add("hidden");
    reposList.innerHTML = ""; // Clear previous repos

    try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error("User not found");
        const userData = await userResponse.json();

        // Update user details
        profilePic.src = userData.avatar_url;
        name.textContent = userData.name || userData.login;
        bio.textContent = userData.bio || "No bio available";
        repos.textContent = userData.public_repos;
        followers.textContent = userData.followers;
        following.textContent = userData.following;
        profileLink.href = userData.html_url;

        // Fetch recent repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        const reposData = await reposResponse.json();

        // Display repositories
        reposData.forEach(repo => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
            reposList.appendChild(li);
        });

        // Show user info
        userInfo.classList.remove("hidden");
    } catch (error) {
        alert(error.message);
    } finally {
        // Hide loading
        loading.classList.add("hidden");
    }
}