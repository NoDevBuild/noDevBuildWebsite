/**
 * CollaboratedCompanies component displays logos of partner companies as clickable links.
 * @module CollaboratedCompanies
 */
// @ts-nocheck
import React from 'react';

const companies = [
  {
    name: 'Sustvest',
    logo: '/collaborated-companies/sustvest-logo.avif',
    url: 'https://sustvest.com/',
    urlDisplay: 'https://sustvest.com',
    description: 'Sustvest has successfully raised $1.7 million in a Series A funding round.'
  },
  {
    name: 'Krypsm',
    logo: '/collaborated-companies/krypsm_logo.webp',
    url: 'https://www.krypsm.com/',
    urlDisplay: 'https://www.krypsm.com',
    description: 'Krypsm secured 1.5 million Dirhams (~$400,000 USD) in funding.'
  },
  {
    name: 'GenMe',
    logo: '/collaborated-companies/genme-logo.svg',
    url: 'https://genme.in/',
    urlDisplay: 'https://genme.in',
    description: 'GenMe raised $10,000 in Seed Funding.'
  },
];

const CollaboratedCompanies = () => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-2 text-xl md:text-2xl font-medium text-gray-900">MEET OUR</div>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-20 text-blue-700 tracking-tight">
          SUCCESS STORIES
        </h2>
        <div className="flex flex-col md:flex-row items-start justify-center gap-12 md:gap-8">
          {companies.map((company) => (
            <div key={company.name} className="flex-1 flex flex-col items-center text-center max-w-xs mx-auto">
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-4 block"
                title={company.name}
              >
                <img
                  src={company.logo}
                  alt={company.name + ' logo'}
                  className="h-20 md:h-24 object-contain mx-auto"
                  style={{ maxWidth: '180px' }}
                />
              </a>
              <a
                href={company.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black text-xs md:text-sm mb-2 hover:underline"
                style={{ wordBreak: 'break-all' }}
              >
                {company.urlDisplay}
              </a>
              <div className="text-gray-700 text-base md:text-lg mt-12 font-bold" style={{ minHeight: '60px' }}>{company.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollaboratedCompanies; 