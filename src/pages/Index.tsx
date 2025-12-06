import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  badge?: string;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<number[]>([]);

  const products: Product[] = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 129990, image: '📱', category: 'phones', rating: 5, badge: 'ХИТ' },
    { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 119990, image: '📱', category: 'phones', rating: 5, badge: 'НОВИНКА' },
    { id: 3, name: 'MacBook Pro 16"', price: 249990, image: '💻', category: 'laptops', rating: 5, badge: 'ХИТ' },
    { id: 4, name: 'Dell XPS 15', price: 189990, image: '💻', category: 'laptops', rating: 4.5 },
    { id: 5, name: 'AirPods Pro 2', price: 24990, image: '🎧', category: 'accessories', rating: 5, badge: 'АКЦИЯ' },
    { id: 6, name: 'Sony WH-1000XM5', price: 32990, image: '🎧', category: 'accessories', rating: 5 },
    { id: 7, name: 'Samsung QLED 4K 65"', price: 149990, image: '📺', category: 'tv', rating: 4.5, badge: 'НОВИНКА' },
    { id: 8, name: 'LG OLED 55"', price: 129990, image: '📺', category: 'tv', rating: 5 },
  ];

  const addToCart = (id: number) => {
    setCart([...cart, id]);
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-4xl">⚡</div>
            <h1 className="text-3xl font-bold text-gradient">VOLT</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {['home', 'catalog', 'about', 'promo', 'reviews', 'contacts'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {section === 'home' && 'Главная'}
                {section === 'catalog' && 'Каталог'}
                {section === 'about' && 'О магазине'}
                {section === 'promo' && 'Акции'}
                {section === 'reviews' && 'Отзывы'}
                {section === 'contacts' && 'Контакты'}
              </button>
            ))}
          </div>

          <Button className="bg-primary hover:bg-primary/90 relative">
            <Icon name="ShoppingCart" size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Button>
        </nav>
      </header>

      <main className="pt-20">
        <section id="home" className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h2 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="text-gradient">Электроника</span>
                <br />
                <span className="text-foreground">нового поколения</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Официальный магазин техники с гарантией качества, сертификатами и профессиональным сервисом
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90 hover-glow text-lg px-8">
                  <Icon name="Zap" size={20} className="mr-2" />
                  Каталог товаров
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8">
                  <Icon name="Gift" size={20} className="mr-2" />
                  Акции
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">
              <span className="text-gradient">Каталог товаров</span>
            </h2>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-5 mb-8">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="phones">Смартфоны</TabsTrigger>
                <TabsTrigger value="laptops">Ноутбуки</TabsTrigger>
                <TabsTrigger value="accessories">Аксессуары</TabsTrigger>
                <TabsTrigger value="tv">ТВ</TabsTrigger>
              </TabsList>

              {['all', 'phones', 'laptops', 'accessories', 'tv'].map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products
                      .filter((p) => category === 'all' || p.category === category)
                      .map((product) => (
                        <Card key={product.id} className="glass-card hover-glow group overflow-hidden">
                          <CardContent className="p-6">
                            {product.badge && (
                              <Badge className="mb-3 bg-accent text-white">{product.badge}</Badge>
                            )}
                            <div className="text-6xl mb-4 transition-transform group-hover:scale-110">
                              {product.image}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                            <div className="flex items-center gap-1 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Icon
                                  key={i}
                                  name={i < Math.floor(product.rating) ? 'Star' : 'StarOff'}
                                  size={16}
                                  className={i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-muted'}
                                />
                              ))}
                              <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-primary">
                                {product.price.toLocaleString('ru-RU')} ₽
                              </span>
                              <Button
                                size="sm"
                                onClick={() => addToCart(product.id)}
                                className="bg-secondary hover:bg-secondary/90"
                              >
                                <Icon name="ShoppingBag" size={16} />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        <section id="about" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-gradient">О магазине Volt</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="glass-card hover-glow p-6 text-center">
                <Icon name="Shield" size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Гарантия качества</h3>
                <p className="text-muted-foreground">
                  Официальная гарантия производителя до 3 лет. Все товары сертифицированы и проходят проверку.
                </p>
              </Card>
              <Card className="glass-card hover-glow p-6 text-center">
                <Icon name="Award" size={48} className="text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Сертификаты</h3>
                <p className="text-muted-foreground">
                  Работаем только с оригинальной техникой. Все сертификаты соответствия в наличии.
                </p>
              </Card>
              <Card className="glass-card hover-glow p-6 text-center">
                <Icon name="Wrench" size={48} className="text-accent mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Сервисное обслуживание</h3>
                <p className="text-muted-foreground">
                  Собственный сервисный центр. Ремонт и техническая поддержка в течение всего срока эксплуатации.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section id="promo" className="py-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-gradient">Специальные предложения</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="glass-card p-8 border-2 border-primary/50 hover-glow">
                <Icon name="Percent" size={40} className="text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Скидка до 30%</h3>
                <p className="text-muted-foreground mb-4">
                  На смартфоны флагманской линейки. Успей купить топовый телефон по выгодной цене!
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  Смотреть товары
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </Card>
              <Card className="glass-card p-8 border-2 border-accent/50 hover-glow">
                <Icon name="Gift" size={40} className="text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-3">Подарок к покупке</h3>
                <p className="text-muted-foreground mb-4">
                  При покупке ноутбука — беспроводная мышь в подарок. Акция действует до конца месяца.
                </p>
                <Button className="bg-accent hover:bg-accent/90">
                  Подробнее
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </Card>
            </div>
          </div>
        </section>

        <section id="reviews" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-gradient">Отзывы покупателей</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { name: 'Алексей М.', rating: 5, text: 'Купил iPhone 15 Pro - всё отлично! Быстрая доставка, товар оригинальный, все документы в порядке.' },
                { name: 'Мария К.', rating: 5, text: 'Замечательный магазин! Консультанты помогли выбрать ноутбук, рассказали про все модели. Очень довольна покупкой.' },
                { name: 'Дмитрий П.', rating: 5, text: 'Отличные цены и качественный сервис. Гарантия реально работает - заменили наушники без проблем.' },
              ].map((review, idx) => (
                <Card key={idx} className="glass-card p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < review.rating ? 'text-accent fill-accent' : 'text-muted'}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{review.text}"</p>
                  <p className="font-semibold">{review.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="contacts" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">
              <span className="text-gradient">Контакты</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={24} className="text-secondary" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">info@volt-store.ru</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={24} className="text-accent" />
                    <div>
                      <p className="font-semibold">Адрес</p>
                      <p className="text-muted-foreground">г. Москва, ул. Электронная, д. 25</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" size={24} className="text-primary" />
                    <div>
                      <p className="font-semibold">Режим работы</p>
                      <p className="text-muted-foreground">Ежедневно с 10:00 до 21:00</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="glass-card p-8">
                <h3 className="text-2xl font-bold mb-6">Мы на карте</h3>
                <div className="aspect-video bg-muted/50 rounded-lg flex items-center justify-center">
                  <Icon name="Map" size={64} className="text-muted-foreground" />
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="text-3xl">⚡</div>
              <span className="text-2xl font-bold text-gradient">VOLT</span>
            </div>
            <p className="text-muted-foreground text-center">
              © 2024 Volt Store. Официальный магазин электроники
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
