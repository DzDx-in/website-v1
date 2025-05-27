'use client';

const socialLinks = [
  {
    icon: 'fab fa-linkedin',
    href: 'https://www.linkedin.com/company/dzdx-in',
    label: 'LinkedIn',
  },
  {
    icon: 'fab fa-twitter',
    href: 'https://twitter.com/dzdx_solutions',
    label: 'Twitter',
  },
  {
    icon: 'fab fa-github',
    href: 'https://github.com/dzdx-in',
    label: 'GitHub',
  },
  {
    icon: 'fab fa-instagram',
    href: 'https://www.instagram.com/dzdx.in/',
    label: 'Instagram',
  },
];

const SocialLinks = () => {
  return (
    <div className="flex justify-center space-x-6">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link text-white text-2xl hover:text-dzdx-blue"
          aria-label={link.label}
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;