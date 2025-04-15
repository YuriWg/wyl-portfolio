import React from 'react';

const Decorations: React.FC = () => {
  return (
    <>
      {/* 方形装饰 - 右上角 */}
      <div style={{
        position: 'fixed',
        top: '10%',
        right: '10%',
        width: '150px',
        height: '150px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Cpath d=\'M20,20 L80,20 L80,80 L20,80 Z\' stroke-dasharray=\'5,5\' stroke-opacity=\'0.3\'/%3E%3Cpath d=\'M30,30 L70,30 L70,70 L30,70 Z\' stroke-opacity=\'0.3\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(15deg)'
      }}></div>
      
      {/* 圆形装饰 - 左下角 */}
      <div style={{
        position: 'fixed',
        bottom: '5%',
        left: '15%',
        width: '180px',
        height: '180px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'40\' stroke-opacity=\'0.3\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'30\' stroke-opacity=\'0.2\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'20\' stroke-opacity=\'0.1\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(-10deg)'
      }}></div>
      
      {/* 波浪线装饰 - 右下角 */}
      <div style={{
        position: 'fixed',
        bottom: '20%',
        right: '15%',
        width: '200px',
        height: '100px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Cpath d=\'M0,50 C40,30 80,70 120,50 C160,30 200,50 200,50\' stroke-opacity=\'0.3\'/%3E%3Cpath d=\'M0,60 C40,40 80,80 120,60 C160,40 200,60 200,60\' stroke-opacity=\'0.2\'/%3E%3Cpath d=\'M0,40 C40,20 80,60 120,40 C160,20 200,40 200,40\' stroke-opacity=\'0.1\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(35deg)'
      }}></div>
      
      {/* 嵌套方形装饰 - 左上角 */}
      <div style={{
        position: 'fixed',
        top: '15%',
        left: '10%',
        width: '180px',
        height: '180px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Cpath d=\'M10,10 L90,10 L90,90 L10,90 Z\' stroke-opacity=\'0.05\'/%3E%3Cpath d=\'M20,20 L80,20 L80,80 L20,80 Z\' stroke-opacity=\'0.1\'/%3E%3Cpath d=\'M30,30 L70,30 L70,70 L30,70 Z\' stroke-opacity=\'0.15\'/%3E%3Cpath d=\'M40,40 L60,40 L60,60 L40,60 Z\' stroke-opacity=\'0.2\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(5deg)'
      }}></div>
      
      {/* 菱形装饰 - 中央右侧 */}
      <div style={{
        position: 'fixed',
        top: '40%',
        right: '10%',
        width: '160px',
        height: '160px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' fill=\'none\' stroke=\'%23000\' stroke-width=\'1\'%3E%3Cpath d=\'M20,50 L50,20 L80,50 L50,80 Z\' stroke-opacity=\'0.3\'/%3E%3Cpath d=\'M30,50 L50,30 L70,50 L50,70 Z\' stroke-opacity=\'0.2\'/%3E%3Cpath d=\'M40,50 L50,40 L60,50 L50,60 Z\' stroke-opacity=\'0.1\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.8,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(-5deg)'
      }}></div>
      
      {/* 新增: 点点装饰 */}
      <div style={{
        position: 'fixed',
        bottom: '40%',
        left: '15%',
        width: '100px',
        height: '100px',
        background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\' fill=\'%23000\'%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'3\' opacity=\'0.5\'/%3E%3Ccircle cx=\'50\' cy=\'20\' r=\'3\' opacity=\'0.5\'/%3E%3Ccircle cx=\'80\' cy=\'20\' r=\'3\' opacity=\'0.5\'/%3E%3Ccircle cx=\'20\' cy=\'50\' r=\'3\' opacity=\'0.5\'/%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'3\' opacity=\'0.5\'/%3E%3Ccircle cx=\'80\' cy=\'50\' r=\'3\' opacity=\'0.5\'/%3E%3Ccircle cx=\'20\' cy=\'80\' r=\'3\' opacity=\'0.5\'/%3E%3Ccircle cx=\'50\' cy=\'80\' r=\'3\' opacity=\'0.5\'/%3E%3Ccircle cx=\'80\' cy=\'80\' r=\'3\' opacity=\'0.5\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        opacity: 0.3,
        zIndex: 0,
        pointerEvents: 'none',
        transform: 'rotate(8deg)'
      }}></div>
    </>
  );
};

export default Decorations;