<template>
    <div class="dashboard-container">
      <h1>DASHBOARD</h1>
      <div class="iframe-container">
        <iframe
          title="API"
          src="https://app.powerbi.com/groups/me/reports/4d92f045-50c1-4c5e-a953-9ac7a1123f63/63b59f3b57f43501469d?experience=power-bi&bookmarkGuid=f18ca5bf3755f10ab405"
          frameborder="0"
          allowfullscreen="true">
        </iframe>
      </div>
    </div>
</template>
  
<style scoped>
.dashboard-container {
    margin-left: 300px;
    padding: 20px;
    background-color: #f7f8fa;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
  
h1 {
    color: #2c3e50;
    font-family: var(--font-family);
    margin-bottom: 20px;
}
  
.iframe-container {
    width: 90%;
    height: 0;
    padding-bottom: 50%; 
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}
  
iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
}
</style>
  