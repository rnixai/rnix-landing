/**
 * Append UTM parameters for PostHog analytics.
 * utm_source=landing — traffic from rnix landing page
 * utm_medium — link type (nav, cta, footer, link)
 * utm_content — specific placement for attribution
 */
export function withUtm(
  url: string,
  content: string,
  medium: 'nav' | 'cta' | 'footer' | 'link' = 'link'
): string {
  const params = new URLSearchParams({
    utm_source: 'landing',
    utm_medium: medium,
    utm_campaign: 'rnix_homepage',
    utm_content: content,
  });
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params.toString()}`;
}
