import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatsFound, setThreatsFound] = useState(0);
  const [filesScanned, setFilesScanned] = useState(0);

  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            return 100;
          }
          return prev + 2;
        });
        setFilesScanned((prev) => prev + Math.floor(Math.random() * 50));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isScanning]);

  const startScan = (quick: boolean) => {
    setIsScanning(true);
    setScanProgress(0);
    setFilesScanned(0);
    setThreatsFound(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <Icon name="Shield" size={24} className="text-background" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CyberShield
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#home" className="text-foreground/80 hover:text-primary transition-colors">Главная</a>
            <a href="#protection" className="text-foreground/80 hover:text-primary transition-colors">Защита</a>
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">Функции</a>
            <a href="#download" className="text-foreground/80 hover:text-primary transition-colors">Скачать</a>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
            Начать защиту
          </Button>
        </div>
      </nav>

      <section id="home" className="container mx-auto px-6 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-sm text-primary">Защита нового поколения</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Абсолютная защита
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                вашей системы
              </span>
            </h1>
            <p className="text-lg text-foreground/70">
              Передовые технологии искусственного интеллекта и машинного обучения для обнаружения и нейтрализации угроз в реальном времени
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90"
                onClick={() => startScan(true)}
              >
                <Icon name="Play" size={20} className="mr-2" />
                Быстрое сканирование
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/30 hover:bg-primary/10"
                onClick={() => startScan(false)}
              >
                <Icon name="Search" size={20} className="mr-2" />
                Глубокое сканирование
              </Button>
            </div>
          </div>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Статус защиты</h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-glow" />
                  <span className="text-green-500 font-medium">Защищено</span>
                </div>
              </div>

              {isScanning && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Сканирование...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} className="h-2" />
                  <div className="text-sm text-foreground/60">
                    Проверено файлов: {filesScanned.toLocaleString()}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-3xl font-bold text-green-500">0</div>
                  <div className="text-xs text-foreground/60 mt-1">Угрозы</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-foreground/60 mt-1">Защита</div>
                </div>
                <div className="text-center p-4 bg-background/50 rounded-lg">
                  <div className="text-3xl font-bold text-secondary">100%</div>
                  <div className="text-xs text-foreground/60 mt-1">Надежность</div>
                </div>
              </div>

              <div className="relative h-40 bg-background/50 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Icon name="Shield" size={80} className="text-primary/20" />
                </div>
                {isScanning && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-scan" />
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="protection" className="py-20 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Многоуровневая защита</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Комплексная система защиты от всех видов киберугроз
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Scan', title: 'Сканирование', desc: 'Быстрое и глубокое' },
              { icon: 'Shield', title: 'Брандмауэр', desc: 'Защита сети в реальном времени' },
              { icon: 'Lock', title: 'Шифрование', desc: 'Безопасность данных' },
              { icon: 'Zap', title: 'Быстрая реакция', desc: 'Мгновенная нейтрализация' }
            ].map((item, idx) => (
              <Card 
                key={idx}
                className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={item.icon as any} size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-foreground/60 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Функции антивируса</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Все необходимое для полной защиты вашей системы
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center animate-float">
                  <Icon name="Radar" size={32} className="text-background" />
                </div>
                <h3 className="text-2xl font-bold">Сканирование в реальном времени</h3>
                <p className="text-foreground/70">
                  Непрерывный мониторинг всех файлов и процессов в системе с использованием технологий машинного обучения
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="CheckCircle2" size={20} />
                  <span className="text-sm font-medium">Активно</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                  <Icon name="Database" size={32} className="text-background" />
                </div>
                <h3 className="text-2xl font-bold">Облачная база угроз</h3>
                <p className="text-foreground/70">
                  Постоянно обновляемая база данных вирусных сигнатур и поведенческих паттернов вредоносного ПО
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="Cloud" size={20} />
                  <span className="text-sm font-medium">Обновлено сегодня</span>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                  <Icon name="Brain" size={32} className="text-background" />
                </div>
                <h3 className="text-2xl font-bold">ИИ-анализ</h3>
                <p className="text-foreground/70">
                  Искусственный интеллект выявляет новые угрозы по аномальному поведению, даже если они отсутствуют в базе
                </p>
                <div className="flex items-center gap-2 text-primary">
                  <Icon name="Sparkles" size={20} />
                  <span className="text-sm font-medium">Включено</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section id="download" className="py-20 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Скачать CyberShield</h2>
              <p className="text-foreground/70">
                Выберите подходящую версию для вашей системы
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all">
                <div className="text-center space-y-4">
                  <Icon name="Laptop" size={48} className="text-primary mx-auto" />
                  <h3 className="text-xl font-bold">Windows</h3>
                  <p className="text-sm text-foreground/60">Windows 10/11</p>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                    <Icon name="Download" size={18} className="mr-2" />
                    Скачать
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/50 border-2 relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-primary text-background text-xs px-2 py-1 rounded-full">
                  Популярно
                </div>
                <div className="text-center space-y-4">
                  <Icon name="Apple" size={48} className="text-primary mx-auto" />
                  <h3 className="text-xl font-bold">macOS</h3>
                  <p className="text-sm text-foreground/60">macOS 12+</p>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                    <Icon name="Download" size={18} className="mr-2" />
                    Скачать
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all">
                <div className="text-center space-y-4">
                  <Icon name="Smartphone" size={48} className="text-primary mx-auto" />
                  <h3 className="text-xl font-bold">Android</h3>
                  <p className="text-sm text-foreground/60">Android 9+</p>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                    <Icon name="Download" size={18} className="mr-2" />
                    Скачать
                  </Button>
                </div>
              </Card>
            </div>

            <div className="mt-12 p-6 bg-background/50 rounded-xl border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Info" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Системные требования</h4>
                  <ul className="text-sm text-foreground/70 space-y-1">
                    <li>• Процессор: 2 ГГц или выше</li>
                    <li>• Оперативная память: 4 ГБ или более</li>
                    <li>• Свободное место: 500 МБ</li>
                    <li>• Подключение к интернету для обновлений</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-12 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Shield" size={24} className="text-background" />
              </div>
              <span className="text-xl font-bold">CyberShield</span>
            </div>
            <div className="text-sm text-foreground/60">
              © 2024 CyberShield. Максимальная защита вашей системы
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
