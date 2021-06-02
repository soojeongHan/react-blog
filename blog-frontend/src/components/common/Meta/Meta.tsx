import React from 'react';
import { Helmet } from 'react-helmet-async';

type MetaProps = {
  data: {
    title: string,
    lang?: string,
    description?: string,
    image?: string,
    canoical?: string,
  }
}

const Meta = ({ data }: MetaProps) => {
  const title = data.title;
  const lang = 'ko_KR';
  const description = data.description || '';
  const image = data.image || '';
  const url = "https://soojeonghan.com/";
  const canonical = url + (data.canoical || '');
  const type = 'website';

  return (
    <Helmet>
      <html lang={lang} />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {image ? <link rel="image_src" href={image} /> : null}
      {image ? <meta itemProp="image" content={image} /> : null}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content={image} /* SUMMARY_LARGE_IMAGE */ />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

    </Helmet>
  );
};

export default Meta;
