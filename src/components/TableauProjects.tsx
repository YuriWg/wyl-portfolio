import React from 'react';
import TableauEmbed from './TableauEmbed';

const TableauProjects: React.FC = () => {
  const tableauWorks = [
    {
      id: 'viz1744187245528',
      title: '碳中和',
      vizName: '_16205984439490/CarbonNeutralization',
      width: '1300px',
      height: '4527px',
      staticImageSrc: 'https://public.tableau.com/static/images/_1/_16205984439490/CarbonNeutralization/1_rss.png'
    },
    {
      id: 'viz1744187308580',
      title: '汇率变化',
      vizName: 'The6thVizChallengeTheExchangeRate/sheet0',
      width: '1000px',
      height: '2827px',
      staticImageSrc: 'https://public.tableau.com/static/images/Th/The6thVizChallengeTheExchangeRate/sheet0/1_rss.png'
    },
    {
      id: 'viz1744187339506',
      title: '信息可视化',
      vizName: 'infowetrustmakeovermonday2019week16/1',
      width: '1366px',
      height: '827px',
      staticImageSrc: 'https://public.tableau.com/static/images/in/infowetrustmakeovermonday2019week16/1/1_rss.png'
    },
    // 你可以继续添加更多 Tableau 作品
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-2xl font-bold mb-6">Tableau 作品集</h2>
      {tableauWorks.map((work) => (
        <div key={work.id} className="mb-12">
          <h3 className="text-xl font-semibold mb-4">{work.title}</h3>
          <TableauEmbed
            vizId={work.id}
            width={work.width}
            height={work.height}
            vizName={work.vizName}
            staticImageSrc={work.staticImageSrc}
          />
        </div>
      ))}
    </div>
  );
};

export default TableauProjects;