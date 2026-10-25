const suppliedDomain = new URLSearchParams(window.location.search).get('domain');
const domain = (suppliedDomain ?? '').trim().toLowerCase().replace(/^www\./, '');
const domainPattern = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;
const message = document.querySelector<HTMLHeadingElement>('#domain-services-message');

if (message && domain.length <= 253 && domainPattern.test(domain)) {
  message.textContent = `Domain Registration and DNS services for ${domain} provided by AmeriHost`;
}

const year = document.querySelector<HTMLTimeElement>('#domain-services-year');

if (year) {
  const currentYear = String(new Date().getFullYear());
  year.textContent = currentYear;
  year.dateTime = currentYear;
}

export {};
