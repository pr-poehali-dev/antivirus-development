import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weekData = [
  { day: 'Пн', threats: 3, blocked: 3 },
  { day: 'Вт', threats: 7, blocked: 7 },
  { day: 'Ср', threats: 2, blocked: 2 },
  { day: 'Чт', threats: 12, blocked: 12 },
  { day: 'Пт', threats: 5, blocked: 5 },
  { day: 'Сб', threats: 1, blocked: 1 },
  { day: 'Вс', threats: 0, blocked: 0 },
];

const Index = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [threatsFound, setThreatsFound] = useState(0);
  const [filesScanned, setFilesScanned] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    if (isScanning && selectedFiles.length > 0) {
      let currentFileIndex = 0;
      const totalFiles = selectedFiles.length;
      
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            setCurrentFile('Сканирование завершено');
            return 100;
          }
          return prev + (100 / totalFiles);
        });
        
        if (currentFileIndex < totalFiles) {
          setCurrentFile(selectedFiles[currentFileIndex].name);
          setFilesScanned(currentFileIndex + 1);
          currentFileIndex++;
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isScanning, selectedFiles]);

  const handleFileSelect = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.webkitdirectory = false;
      
      input.onchange = (e) => {
        const files = Array.from((e.target as HTMLInputElement).files || []);
        if (files.length > 0) {
          setSelectedFiles(files);
          startScan(files);
        }
      };
      
      input.click();
    } catch (error) {
      console.error('File selection error:', error);
    }
  };

  const handleFolderSelect = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.webkitdirectory = true;
      
      input.onchange = (e) => {
        const files = Array.from((e.target as HTMLInputElement).files || []);
        if (files.length > 0) {
          setSelectedFiles(files);
          startScan(files);
        }
      };
      
      input.click();
    } catch (error) {
      console.error('Folder selection error:', error);
    }
  };

  const startScan = (files: File[]) => {
    setIsScanning(true);
    setScanProgress(0);
    setFilesScanned(0);
    setThreatsFound(0);
    setCurrentFile('Инициализация сканирования...');
  };

  const totalThreatsWeek = weekData.reduce((sum, day) => sum + day.threats, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/50 backdrop-blur-sm bg-card/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-background" />
          </div>
          <div>
            <h1 className="text-xl font-bold">CyberShield Pro</h1>
            <p className="text-xs text-muted-foreground">Система защиты нового поколения</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-green-500/30 text-green-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-glow mr-2" />
            Защита активна
          </Badge>
          <Button variant="ghost" size="icon">
            <Icon name="Settings" size={20} />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        <div className="grid lg:grid-cols-3 gap-6 h-full">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-border/50">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Сканирование системы</h2>
                    <p className="text-sm text-muted-foreground">
                      {isScanning ? 'Идет проверка файлов...' : 'Выберите файлы или папку для проверки'}
                    </p>
                  </div>
                  {!isScanning && (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleFileSelect}
                        className="bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90"
                      >
                        <Icon name="File" size={18} className="mr-2" />
                        Файлы
                      </Button>
                      <Button 
                        onClick={handleFolderSelect}
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10"
                      >
                        <Icon name="Folder" size={18} className="mr-2" />
                        Папка
                      </Button>
                    </div>
                  )}
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-4">
                    <div className="relative h-48 bg-background/50 rounded-xl overflow-hidden border border-border/50">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Shield" size={100} className="text-primary/10" />
                      </div>
                      {isScanning && (
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-scan" />
                      )}
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                          {Math.round(scanProgress)}%
                        </div>
                        <p className="text-sm text-muted-foreground px-4 text-center truncate max-w-md">
                          {currentFile}
                        </p>
                      </div>
                    </div>

                    <Progress value={scanProgress} className="h-3" />

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            <Icon name="Files" size={20} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold">{filesScanned}</p>
                            <p className="text-xs text-muted-foreground">Проверено</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Icon name="ShieldCheck" size={20} className="text-green-500" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-500">{selectedFiles.length - threatsFound}</p>
                            <p className="text-xs text-muted-foreground">Безопасные</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-background/50 rounded-lg p-4 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-destructive/20 rounded-lg flex items-center justify-center">
                            <Icon name="AlertTriangle" size={20} className="text-destructive" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-destructive">{threatsFound}</p>
                            <p className="text-xs text-muted-foreground">Угрозы</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Статистика угроз за неделю</h3>
                  <Badge variant="outline" className="text-destructive border-destructive/30">
                    {totalThreatsWeek} обнаружено
                  </Badge>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weekData}>
                      <defs>
                        <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis 
                        dataKey="day" 
                        stroke="hsl(var(--muted-foreground))"
                        style={{ fontSize: '12px' }}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        style={{ fontSize: '12px' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="threats" 
                        stroke="hsl(var(--primary))" 
                        fillOpacity={1} 
                        fill="url(#colorThreats)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{totalThreatsWeek}</p>
                    <p className="text-sm text-muted-foreground">Всего угроз</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-500">{totalThreatsWeek}</p>
                    <p className="text-sm text-muted-foreground">Заблокировано</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-4">Активная защита</h3>
              <div className="space-y-4">
                {[
                  { icon: 'Shield', label: 'Файловый монитор', status: true },
                  { icon: 'Globe', label: 'Веб-защита', status: true },
                  { icon: 'Mail', label: 'Защита почты', status: true },
                  { icon: 'HardDrive', label: 'Защита USB', status: false },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.status ? 'bg-green-500/20' : 'bg-muted/50'}`}>
                        <Icon name={item.icon as any} size={16} className={item.status ? 'text-green-500' : 'text-muted-foreground'} />
                      </div>
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${item.status ? 'bg-green-500 animate-pulse-glow' : 'bg-muted-foreground'}`} />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
              <h3 className="text-lg font-bold mb-4">Последние события</h3>
              <div className="space-y-3">
                {[
                  { time: '10:24', event: 'Угроза заблокирована', type: 'danger', file: 'malware.exe' },
                  { time: '09:15', event: 'Обновление баз данных', type: 'info', file: 'Успешно' },
                  { time: '08:00', event: 'Быстрое сканирование', type: 'success', file: 'Угроз не найдено' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-background/50 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-sm font-medium">{item.event}</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.file}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border-primary/30">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Crown" size={20} className="text-primary" />
                  <h3 className="text-lg font-bold">Premium версия</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Получите расширенную защиту и приоритетную поддержку
                </p>
                <Button className="w-full bg-gradient-to-r from-primary to-secondary text-background hover:opacity-90">
                  Обновить до Pro
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
