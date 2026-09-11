from pathlib import Path
import re

SLUG = 'typescript-native-api-adds-layered-vfs'
DATE = '2026-09-09'
SOURCE = 'https://github.com/microsoft/TypeScript/pull/64115'
DOCS = Path('website/src/content/docs')

DATA = {
    'root': {
        'title': 'TypeScript native API adds layered virtual file systems',
        'description': 'The native TypeScript API can update snapshots with in-memory or layered virtual file systems, including additions, changes, removals, and host fallbacks.',
        'date': '**Published:** September 9, 2026',
        'intro': 'The native TypeScript API can now build and update snapshots with explicit virtual file system data. This lets tools model file additions, edits, and removals without rebuilding the entire file system input.',
        'what': 'What changed',
        'p1': 'New helpers `createFileSystem`, `createFileSystemWithLib`, and `createFileSystemLayer` create VFS objects accepted by the snapshot APIs. `Snapshot.update` can apply a new cache layer over an existing snapshot.',
        'p2': 'A `full` VFS stays entirely in memory and does not fall back to host or session file system callbacks. A `layer` VFS falls back on cache misses and can use `removedPaths` to hide files or directories that exist on the host. Both forms support symlinks within the virtual file system and to host paths.',
        'limit_h': 'Current limitation',
        'limit': 'VFS-backed snapshots still count as real snapshots, so the native API keeps its current restriction of one real snapshot at a time. Snapshot operations therefore remain serial for now.',
        'source_h': 'Source',
        'source_prefix': 'Read the merged TypeScript pull request:',
        'summary': 'The native TypeScript API can now update snapshots with in-memory or layered VFS data for file additions, changes, removals, and host fallbacks.',
    },
    'zh-cn': {
        'title': 'TypeScript 原生 API 新增分层虚拟文件系统',
        'description': 'TypeScript 原生 API 现在可以使用内存或分层虚拟文件系统更新快照，并表示文件的新增、修改、删除以及对宿主文件系统的回退。',
        'date': '**发布日期：** 2026 年 9 月 9 日',
        'intro': 'TypeScript 原生 API 现在可以使用显式的虚拟文件系统数据创建和更新快照。这使工具能够在不重新构建整个文件系统输入的情况下表示文件新增、修改和删除。',
        'what': '变化内容',
        'p1': '新增的 `createFileSystem`、`createFileSystemWithLib` 和 `createFileSystemLayer` 辅助函数用于创建快照 API 接受的 VFS 对象。`Snapshot.update` 可以在现有快照之上应用新的缓存层。',
        'p2': '`full` VFS 完全驻留在内存中，不会回退到宿主或会话文件系统回调。`layer` VFS 会在缓存未命中时回退，并可使用 `removedPaths` 隐藏宿主上存在的文件或目录。两种形式都支持虚拟文件系统内部以及指向宿主路径的符号链接。',
        'limit_h': '当前限制',
        'limit': '由 VFS 支持的快照仍被视为真实快照，因此原生 API 目前仍限制同一时间只能存在一个真实快照。快照操作暂时仍需串行执行。',
        'source_h': '来源',
        'source_prefix': '阅读已合并的 TypeScript 拉取请求：',
        'summary': 'TypeScript 原生 API 现在可以通过内存或分层 VFS 数据增量更新快照，并表示文件的新增、修改、删除和宿主回退。',
    },
    'it-it': {
        'title': "L'API nativa di TypeScript aggiunge file system virtuali a livelli",
        'description': "L'API nativa di TypeScript può aggiornare gli snapshot con file system virtuali in memoria o a livelli, includendo aggiunte, modifiche, rimozioni e fallback al file system host.",
        'date': '**Pubblicato:** 9 settembre 2026',
        'intro': "L'API nativa di TypeScript può ora creare e aggiornare snapshot con dati espliciti del file system virtuale. Gli strumenti possono così rappresentare aggiunte, modifiche e rimozioni di file senza ricostruire l'intero input del file system.",
        'what': 'Cosa è cambiato',
        'p1': 'I nuovi helper `createFileSystem`, `createFileSystemWithLib` e `createFileSystemLayer` creano oggetti VFS accettati dalle API degli snapshot. `Snapshot.update` può applicare un nuovo livello di cache sopra uno snapshot esistente.',
        'p2': 'Un VFS `full` rimane interamente in memoria e non usa come fallback le callback del file system host o della sessione. Un VFS `layer` usa il fallback in caso di cache miss e può usare `removedPaths` per nascondere file o directory presenti sull’host. Entrambe le forme supportano link simbolici nel file system virtuale e verso percorsi dell’host.',
        'limit_h': 'Limitazione attuale',
        'limit': 'Gli snapshot basati su VFS contano ancora come snapshot reali, quindi l’API nativa mantiene il limite attuale di un solo snapshot reale alla volta. Per ora le operazioni sugli snapshot restano quindi seriali.',
        'source_h': 'Fonte',
        'source_prefix': 'Leggi la pull request TypeScript unita:',
        'summary': "L'API nativa di TypeScript può ora aggiornare gli snapshot con dati VFS in memoria o a livelli per aggiunte, modifiche, rimozioni e fallback all’host.",
    },
    'pt-br': {
        'title': 'API nativa do TypeScript adiciona sistemas de arquivos virtuais em camadas',
        'description': 'A API nativa do TypeScript pode atualizar snapshots com sistemas de arquivos virtuais em memória ou em camadas, incluindo adições, alterações, remoções e fallback para o host.',
        'date': '**Publicado:** 9 de setembro de 2026',
        'intro': 'A API nativa do TypeScript agora pode criar e atualizar snapshots com dados explícitos de sistema de arquivos virtual. Isso permite que ferramentas representem adições, edições e remoções de arquivos sem reconstruir toda a entrada do sistema de arquivos.',
        'what': 'O que mudou',
        'p1': 'Os novos helpers `createFileSystem`, `createFileSystemWithLib` e `createFileSystemLayer` criam objetos VFS aceitos pelas APIs de snapshot. `Snapshot.update` pode aplicar uma nova camada de cache sobre um snapshot existente.',
        'p2': 'Um VFS `full` permanece totalmente em memória e não recorre aos callbacks do sistema de arquivos do host ou da sessão. Um VFS `layer` recorre ao host em falhas de cache e pode usar `removedPaths` para ocultar arquivos ou diretórios existentes no host. As duas formas oferecem suporte a links simbólicos dentro do sistema de arquivos virtual e para caminhos do host.',
        'limit_h': 'Limitação atual',
        'limit': 'Snapshots baseados em VFS ainda contam como snapshots reais, portanto a API nativa mantém a restrição atual de apenas um snapshot real por vez. Assim, as operações de snapshot continuam seriais por enquanto.',
        'source_h': 'Fonte',
        'source_prefix': 'Leia a pull request mesclada do TypeScript:',
        'summary': 'A API nativa do TypeScript agora pode atualizar snapshots com dados VFS em memória ou em camadas para adições, alterações, remoções e fallback ao host.',
    },
    'sv-se': {
        'title': 'TypeScripts inbyggda API får virtuella filsystem i lager',
        'description': 'TypeScripts inbyggda API kan uppdatera ögonblicksbilder med virtuella filsystem i minnet eller i lager, inklusive tillägg, ändringar, borttagningar och fallback till värdsystemet.',
        'date': '**Publicerad:** 9 september 2026',
        'intro': 'TypeScripts inbyggda API kan nu skapa och uppdatera ögonblicksbilder med explicit data för virtuella filsystem. Verktyg kan därmed modellera tillagda, ändrade och borttagna filer utan att bygga om hela filsystemets indata.',
        'what': 'Vad har ändrats',
        'p1': 'De nya hjälpfunktionerna `createFileSystem`, `createFileSystemWithLib` och `createFileSystemLayer` skapar VFS-objekt som snapshot-API:erna accepterar. `Snapshot.update` kan lägga ett nytt cachelager ovanpå en befintlig ögonblicksbild.',
        'p2': 'Ett `full`-VFS ligger helt i minnet och faller inte tillbaka på filsystemscallbacks från värden eller sessionen. Ett `layer`-VFS faller tillbaka vid cachemissar och kan använda `removedPaths` för att dölja filer eller kataloger som finns på värden. Båda formerna stöder symboliska länkar inom det virtuella filsystemet och till värdsökvägar.',
        'limit_h': 'Nuvarande begränsning',
        'limit': 'VFS-baserade ögonblicksbilder räknas fortfarande som riktiga ögonblicksbilder, så det inbyggda API:t behåller begränsningen till en riktig ögonblicksbild åt gången. Snapshot-operationer är därför fortfarande seriella tills vidare.',
        'source_h': 'Källa',
        'source_prefix': 'Läs den sammanslagna TypeScript-pull requesten:',
        'summary': 'TypeScripts inbyggda API kan nu uppdatera ögonblicksbilder med VFS-data i minnet eller i lager för tillägg, ändringar, borttagningar och fallback till värden.',
    },
    'bg-bg': {
        'title': 'Нативният API на TypeScript добавя слоести виртуални файлови системи',
        'description': 'Нативният API на TypeScript може да обновява snapshot-и с виртуални файлови системи в паметта или на слоеве, включително добавяния, промени, премахвания и връщане към host файловата система.',
        'date': '**Публикувано:** 9 септември 2026 г.',
        'intro': 'Нативният API на TypeScript вече може да създава и обновява snapshot-и с изрично зададени данни за виртуална файлова система. Така инструментите могат да моделират добавяне, промяна и премахване на файлове, без да изграждат отново целия вход за файловата система.',
        'what': 'Какво се промени',
        'p1': 'Новите помощни функции `createFileSystem`, `createFileSystemWithLib` и `createFileSystemLayer` създават VFS обекти, приемани от API-тата за snapshot-и. `Snapshot.update` може да приложи нов кеширащ слой върху съществуващ snapshot.',
        'p2': 'VFS от тип `full` остава изцяло в паметта и не използва callback-и към host или session файловата система. VFS от тип `layer` се връща към host файловата система при липса в кеша и може да използва `removedPaths`, за да скрива файлове или директории, съществуващи на host-а. И двата вида поддържат символни връзки във виртуалната файлова система и към host пътища.',
        'limit_h': 'Текущо ограничение',
        'limit': 'Snapshot-ите, поддържани от VFS, все още се считат за реални snapshot-и, затова нативният API запазва текущото ограничение за само един реален snapshot в даден момент. Засега операциите със snapshot-и остават последователни.',
        'source_h': 'Източник',
        'source_prefix': 'Прочетете обединената pull request заявка на TypeScript:',
        'summary': 'Нативният API на TypeScript вече може да обновява snapshot-и с VFS данни в паметта или на слоеве за добавяния, промени, премахвания и host fallback.',
    },
    'es-es': {
        'title': 'La API nativa de TypeScript añade sistemas de archivos virtuales por capas',
        'description': 'La API nativa de TypeScript puede actualizar snapshots con sistemas de archivos virtuales en memoria o por capas, incluidos altas, cambios, eliminaciones y fallback al sistema host.',
        'date': '**Publicado:** 9 de septiembre de 2026',
        'intro': 'La API nativa de TypeScript ahora puede crear y actualizar snapshots con datos explícitos de un sistema de archivos virtual. Esto permite a las herramientas representar archivos añadidos, modificados y eliminados sin reconstruir toda la entrada del sistema de archivos.',
        'what': 'Qué cambió',
        'p1': 'Los nuevos helpers `createFileSystem`, `createFileSystemWithLib` y `createFileSystemLayer` crean objetos VFS aceptados por las API de snapshots. `Snapshot.update` puede aplicar una nueva capa de caché sobre un snapshot existente.',
        'p2': 'Un VFS `full` permanece completamente en memoria y no recurre a callbacks del sistema de archivos del host o de la sesión. Un VFS `layer` recurre al host cuando hay fallos de caché y puede usar `removedPaths` para ocultar archivos o directorios que existen en el host. Ambas formas admiten enlaces simbólicos dentro del sistema de archivos virtual y hacia rutas del host.',
        'limit_h': 'Limitación actual',
        'limit': 'Los snapshots respaldados por VFS siguen contando como snapshots reales, por lo que la API nativa mantiene la restricción actual de un solo snapshot real a la vez. Por ahora, las operaciones de snapshot siguen siendo seriales.',
        'source_h': 'Fuente',
        'source_prefix': 'Lee la pull request de TypeScript ya integrada:',
        'summary': 'La API nativa de TypeScript ahora puede actualizar snapshots con datos VFS en memoria o por capas para altas, cambios, eliminaciones y fallback al host.',
    },
    'ja-jp': {
        'title': 'TypeScript ネイティブ API にレイヤー型仮想ファイルシステムが追加',
        'description': 'TypeScript ネイティブ API は、メモリ内またはレイヤー型の仮想ファイルシステムを使ってスナップショットを更新し、ファイルの追加、変更、削除、ホストへのフォールバックを表現できます。',
        'date': '**公開日:** 2026年9月9日',
        'intro': 'TypeScript ネイティブ API で、明示的な仮想ファイルシステムのデータを使ってスナップショットを作成・更新できるようになりました。ツールはファイルシステム入力全体を作り直さずに、ファイルの追加、編集、削除を表現できます。',
        'what': '変更点',
        'p1': '新しい `createFileSystem`、`createFileSystemWithLib`、`createFileSystemLayer` ヘルパーは、スナップショット API が受け取る VFS オブジェクトを作成します。`Snapshot.update` は既存のスナップショットに新しいキャッシュレイヤーを適用できます。',
        'p2': '`full` VFS は完全にメモリ内にあり、ホストまたはセッションのファイルシステムコールバックへフォールバックしません。`layer` VFS はキャッシュミス時にホストへフォールバックし、`removedPaths` でホスト上に存在するファイルやディレクトリを隠せます。どちらも仮想ファイルシステム内およびホストパスへのシンボリックリンクをサポートします。',
        'limit_h': '現在の制限',
        'limit': 'VFS を使うスナップショットも引き続き「実際の」スナップショットとして数えられるため、ネイティブ API では同時に 1 つの実スナップショットしか保持できない現在の制限が残ります。そのため、スナップショット操作は当面直列です。',
        'source_h': '出典',
        'source_prefix': 'マージ済みの TypeScript pull request を参照してください:',
        'summary': 'TypeScript ネイティブ API は、メモリ内またはレイヤー型 VFS データを使ってファイルの追加、変更、削除、ホストへのフォールバックを伴うスナップショット更新が可能になりました。',
    },
    'fr-fr': {
        'title': 'L’API native de TypeScript ajoute des systèmes de fichiers virtuels en couches',
        'description': 'L’API native de TypeScript peut mettre à jour des snapshots avec des systèmes de fichiers virtuels en mémoire ou en couches, avec ajouts, modifications, suppressions et repli vers l’hôte.',
        'date': '**Publié le :** 9 septembre 2026',
        'intro': 'L’API native de TypeScript peut désormais créer et mettre à jour des snapshots à partir de données explicites de système de fichiers virtuel. Les outils peuvent ainsi représenter les ajouts, modifications et suppressions de fichiers sans reconstruire toute l’entrée du système de fichiers.',
        'what': 'Ce qui change',
        'p1': 'Les nouveaux helpers `createFileSystem`, `createFileSystemWithLib` et `createFileSystemLayer` créent des objets VFS acceptés par les API de snapshot. `Snapshot.update` peut appliquer une nouvelle couche de cache sur un snapshot existant.',
        'p2': 'Un VFS `full` reste entièrement en mémoire et ne se replie pas sur les callbacks du système de fichiers de l’hôte ou de la session. Un VFS `layer` se replie sur l’hôte lors d’un défaut de cache et peut utiliser `removedPaths` pour masquer des fichiers ou répertoires présents sur l’hôte. Les deux formes prennent en charge les liens symboliques dans le système de fichiers virtuel et vers des chemins de l’hôte.',
        'limit_h': 'Limitation actuelle',
        'limit': 'Les snapshots adossés à un VFS comptent toujours comme de vrais snapshots. L’API native conserve donc sa restriction actuelle à un seul vrai snapshot à la fois, et les opérations restent sérielles pour le moment.',
        'source_h': 'Source',
        'source_prefix': 'Lire la pull request TypeScript fusionnée :',
        'summary': 'L’API native de TypeScript peut désormais mettre à jour des snapshots avec des données VFS en mémoire ou en couches pour les ajouts, modifications, suppressions et replis vers l’hôte.',
    },
    'ko-kr': {
        'title': 'TypeScript 네이티브 API에 계층형 가상 파일 시스템 추가',
        'description': 'TypeScript 네이티브 API는 메모리 내 또는 계층형 가상 파일 시스템으로 스냅샷을 업데이트하고 파일 추가, 변경, 삭제 및 호스트 폴백을 표현할 수 있습니다.',
        'date': '**게시일:** 2026년 9월 9일',
        'intro': 'TypeScript 네이티브 API에서 명시적인 가상 파일 시스템 데이터로 스냅샷을 생성하고 업데이트할 수 있게 되었습니다. 도구는 전체 파일 시스템 입력을 다시 만들지 않고도 파일 추가, 수정, 삭제를 모델링할 수 있습니다.',
        'what': '변경 사항',
        'p1': '새로운 `createFileSystem`, `createFileSystemWithLib`, `createFileSystemLayer` 헬퍼는 스냅샷 API가 받는 VFS 객체를 생성합니다. `Snapshot.update`는 기존 스냅샷 위에 새로운 캐시 계층을 적용할 수 있습니다.',
        'p2': '`full` VFS는 완전히 메모리에 유지되며 호스트 또는 세션 파일 시스템 콜백으로 폴백하지 않습니다. `layer` VFS는 캐시 미스 시 호스트로 폴백하고 `removedPaths`를 사용해 호스트에 존재하는 파일이나 디렉터리를 숨길 수 있습니다. 두 형태 모두 가상 파일 시스템 내부와 호스트 경로를 향하는 심볼릭 링크를 지원합니다.',
        'limit_h': '현재 제한',
        'limit': 'VFS 기반 스냅샷도 계속 실제 스냅샷으로 계산되므로 네이티브 API는 한 번에 하나의 실제 스냅샷만 허용하는 현재 제한을 유지합니다. 따라서 스냅샷 작업은 당분간 직렬로 수행됩니다.',
        'source_h': '출처',
        'source_prefix': '병합된 TypeScript pull request를 확인하세요:',
        'summary': 'TypeScript 네이티브 API는 이제 메모리 내 또는 계층형 VFS 데이터로 파일 추가, 변경, 삭제 및 호스트 폴백을 포함한 스냅샷 업데이트를 지원합니다.',
    },
    'id-id': {
        'title': 'API native TypeScript menambahkan sistem berkas virtual berlapis',
        'description': 'API native TypeScript dapat memperbarui snapshot dengan sistem berkas virtual di memori atau berlapis, termasuk penambahan, perubahan, penghapusan, dan fallback ke host.',
        'date': '**Diterbitkan:** 9 September 2026',
        'intro': 'API native TypeScript kini dapat membuat dan memperbarui snapshot dengan data sistem berkas virtual yang eksplisit. Tool dapat memodelkan penambahan, perubahan, dan penghapusan berkas tanpa membangun ulang seluruh input sistem berkas.',
        'what': 'Apa yang berubah',
        'p1': 'Helper baru `createFileSystem`, `createFileSystemWithLib`, dan `createFileSystemLayer` membuat objek VFS yang diterima API snapshot. `Snapshot.update` dapat menerapkan lapisan cache baru di atas snapshot yang sudah ada.',
        'p2': 'VFS `full` sepenuhnya berada di memori dan tidak fallback ke callback sistem berkas host atau sesi. VFS `layer` fallback ke host saat cache miss dan dapat memakai `removedPaths` untuk menyembunyikan berkas atau direktori yang ada di host. Keduanya mendukung symbolic link di dalam sistem berkas virtual maupun ke path host.',
        'limit_h': 'Batasan saat ini',
        'limit': 'Snapshot berbasis VFS tetap dihitung sebagai snapshot nyata, sehingga API native mempertahankan batasan satu snapshot nyata pada satu waktu. Untuk saat ini operasi snapshot tetap berjalan secara serial.',
        'source_h': 'Sumber',
        'source_prefix': 'Baca pull request TypeScript yang telah di-merge:',
        'summary': 'API native TypeScript kini dapat memperbarui snapshot dengan data VFS di memori atau berlapis untuk penambahan, perubahan, penghapusan, dan fallback ke host.',
    },
    'de-de': {
        'title': 'Die native TypeScript-API erhält geschichtete virtuelle Dateisysteme',
        'description': 'Die native TypeScript-API kann Snapshots mit speicherinternen oder geschichteten virtuellen Dateisystemen aktualisieren, einschließlich Hinzufügen, Ändern, Entfernen und Fallback auf den Host.',
        'date': '**Veröffentlicht:** 9. September 2026',
        'intro': 'Die native TypeScript-API kann Snapshots nun mit expliziten Daten eines virtuellen Dateisystems erstellen und aktualisieren. Werkzeuge können damit hinzugefügte, geänderte und entfernte Dateien abbilden, ohne die gesamte Dateisystemeingabe neu aufzubauen.',
        'what': 'Was sich geändert hat',
        'p1': 'Die neuen Hilfsfunktionen `createFileSystem`, `createFileSystemWithLib` und `createFileSystemLayer` erzeugen VFS-Objekte, die von den Snapshot-APIs akzeptiert werden. `Snapshot.update` kann eine neue Cache-Schicht auf einen vorhandenen Snapshot anwenden.',
        'p2': 'Ein `full`-VFS bleibt vollständig im Speicher und fällt nicht auf Dateisystem-Callbacks des Hosts oder der Sitzung zurück. Ein `layer`-VFS greift bei Cache-Misses auf den Host zurück und kann mit `removedPaths` Dateien oder Verzeichnisse ausblenden, die auf dem Host vorhanden sind. Beide Formen unterstützen symbolische Links innerhalb des virtuellen Dateisystems und zu Host-Pfaden.',
        'limit_h': 'Aktuelle Einschränkung',
        'limit': 'VFS-gestützte Snapshots zählen weiterhin als echte Snapshots. Daher behält die native API die aktuelle Einschränkung auf jeweils einen echten Snapshot bei, und Snapshot-Operationen bleiben vorerst seriell.',
        'source_h': 'Quelle',
        'source_prefix': 'Lies den zusammengeführten TypeScript-Pull-Request:',
        'summary': 'Die native TypeScript-API kann Snapshots jetzt mit speicherinternen oder geschichteten VFS-Daten für Hinzufügen, Ändern, Entfernen und Host-Fallback aktualisieren.',
    },
    'pl-pl': {
        'title': 'Natywne API TypeScript dodaje warstwowe wirtualne systemy plików',
        'description': 'Natywne API TypeScript może aktualizować snapshoty za pomocą wirtualnych systemów plików w pamięci lub warstwowych, obsługując dodawanie, zmiany, usuwanie i fallback do hosta.',
        'date': '**Opublikowano:** 9 września 2026 r.',
        'intro': 'Natywne API TypeScript może teraz tworzyć i aktualizować snapshoty z jawnymi danymi wirtualnego systemu plików. Narzędzia mogą odwzorowywać dodawanie, modyfikowanie i usuwanie plików bez ponownego budowania całego wejścia systemu plików.',
        'what': 'Co się zmieniło',
        'p1': 'Nowe funkcje pomocnicze `createFileSystem`, `createFileSystemWithLib` i `createFileSystemLayer` tworzą obiekty VFS akceptowane przez API snapshotów. `Snapshot.update` może nałożyć nową warstwę pamięci podręcznej na istniejący snapshot.',
        'p2': 'VFS typu `full` pozostaje całkowicie w pamięci i nie korzysta z callbacków systemu plików hosta ani sesji. VFS typu `layer` korzysta z hosta przy braku danych w pamięci podręcznej i może używać `removedPaths`, aby ukrywać pliki lub katalogi istniejące na hoście. Obie formy obsługują dowiązania symboliczne wewnątrz wirtualnego systemu plików oraz do ścieżek hosta.',
        'limit_h': 'Obecne ograniczenie',
        'limit': 'Snapshoty oparte na VFS nadal są liczone jako rzeczywiste snapshoty, więc natywne API zachowuje ograniczenie do jednego rzeczywistego snapshotu naraz. Operacje na snapshotach pozostają na razie sekwencyjne.',
        'source_h': 'Źródło',
        'source_prefix': 'Przeczytaj scalony pull request TypeScript:',
        'summary': 'Natywne API TypeScript może teraz aktualizować snapshoty z danymi VFS w pamięci lub warstwowymi dla dodawania, zmian, usuwania i fallbacku do hosta.',
    },
    'tr-tr': {
        'title': "TypeScript yerel API'si katmanlı sanal dosya sistemleri ekliyor",
        'description': "TypeScript yerel API'si, ekleme, değiştirme, kaldırma ve ana sisteme geri dönüş dahil olmak üzere bellek içi veya katmanlı sanal dosya sistemleriyle snapshot'ları güncelleyebilir.",
        'date': '**Yayımlandı:** 9 Eylül 2026',
        'intro': "TypeScript yerel API'si artık açık sanal dosya sistemi verileriyle snapshot oluşturup güncelleyebilir. Araçlar, dosya sistemi girdisinin tamamını yeniden oluşturmadan dosya ekleme, düzenleme ve kaldırma işlemlerini modelleyebilir.",
        'what': 'Neler değişti',
        'p1': 'Yeni `createFileSystem`, `createFileSystemWithLib` ve `createFileSystemLayer` yardımcıları snapshot API’lerinin kabul ettiği VFS nesnelerini oluşturur. `Snapshot.update`, mevcut bir snapshot üzerine yeni bir önbellek katmanı uygulayabilir.',
        'p2': '`full` VFS tamamen bellekte kalır ve ana sistem veya oturum dosya sistemi callback’lerine geri dönmez. `layer` VFS önbellek kaçırmalarında ana sisteme geri döner ve `removedPaths` ile ana sistemde bulunan dosya veya dizinleri gizleyebilir. Her iki biçim de sanal dosya sistemi içindeki ve ana sistem yollarına giden sembolik bağlantıları destekler.',
        'limit_h': 'Mevcut sınırlama',
        'limit': 'VFS destekli snapshot’lar hâlâ gerçek snapshot olarak sayıldığından yerel API aynı anda yalnızca bir gerçek snapshot sınırlamasını korur. Bu nedenle snapshot işlemleri şimdilik seri kalır.',
        'source_h': 'Kaynak',
        'source_prefix': 'Birleştirilmiş TypeScript pull requestini okuyun:',
        'summary': "TypeScript yerel API'si artık ekleme, değiştirme, kaldırma ve ana sisteme geri dönüş için bellek içi veya katmanlı VFS verileriyle snapshot güncelleyebilir.",
    },
    'vi-vn': {
        'title': 'API TypeScript native bổ sung hệ thống tệp ảo phân lớp',
        'description': 'API TypeScript native có thể cập nhật snapshot bằng hệ thống tệp ảo trong bộ nhớ hoặc phân lớp, gồm thêm, thay đổi, xóa tệp và fallback về host.',
        'date': '**Đã xuất bản:** 9 tháng 9, 2026',
        'intro': 'API TypeScript native giờ có thể tạo và cập nhật snapshot bằng dữ liệu hệ thống tệp ảo tường minh. Công cụ có thể mô hình hóa việc thêm, sửa và xóa tệp mà không cần dựng lại toàn bộ đầu vào của hệ thống tệp.',
        'what': 'Thay đổi',
        'p1': 'Các helper mới `createFileSystem`, `createFileSystemWithLib` và `createFileSystemLayer` tạo đối tượng VFS mà API snapshot chấp nhận. `Snapshot.update` có thể áp dụng một lớp cache mới lên snapshot hiện có.',
        'p2': 'VFS `full` nằm hoàn toàn trong bộ nhớ và không fallback về callback hệ thống tệp của host hoặc session. VFS `layer` fallback về host khi cache miss và có thể dùng `removedPaths` để ẩn tệp hoặc thư mục tồn tại trên host. Cả hai dạng đều hỗ trợ symbolic link bên trong hệ thống tệp ảo và tới đường dẫn trên host.',
        'limit_h': 'Giới hạn hiện tại',
        'limit': 'Snapshot dựa trên VFS vẫn được tính là snapshot thực, vì vậy API native giữ giới hạn hiện tại là chỉ một snapshot thực tại một thời điểm. Do đó các thao tác snapshot hiện vẫn chạy tuần tự.',
        'source_h': 'Nguồn',
        'source_prefix': 'Đọc pull request TypeScript đã được merge:',
        'summary': 'API TypeScript native giờ có thể cập nhật snapshot bằng dữ liệu VFS trong bộ nhớ hoặc phân lớp cho việc thêm, thay đổi, xóa và fallback về host.',
    },
    'th-th': {
        'title': 'API เนทีฟของ TypeScript เพิ่มระบบไฟล์เสมือนแบบเป็นชั้น',
        'description': 'API เนทีฟของ TypeScript สามารถอัปเดต snapshot ด้วยระบบไฟล์เสมือนในหน่วยความจำหรือแบบเป็นชั้น รวมถึงการเพิ่ม แก้ไข ลบ และ fallback ไปยัง host',
        'date': '**เผยแพร่:** 9 กันยายน 2026',
        'intro': 'API เนทีฟของ TypeScript สามารถสร้างและอัปเดต snapshot ด้วยข้อมูลระบบไฟล์เสมือนที่ระบุอย่างชัดเจนได้แล้ว เครื่องมือจึงจำลองการเพิ่ม แก้ไข และลบไฟล์ได้โดยไม่ต้องสร้างข้อมูลอินพุตของระบบไฟล์ใหม่ทั้งหมด',
        'what': 'สิ่งที่เปลี่ยนแปลง',
        'p1': 'ตัวช่วยใหม่ `createFileSystem`, `createFileSystemWithLib` และ `createFileSystemLayer` สร้างออบเจ็กต์ VFS ที่ API ของ snapshot รองรับ ส่วน `Snapshot.update` สามารถใช้เลเยอร์แคชใหม่ทับ snapshot ที่มีอยู่ได้',
        'p2': 'VFS แบบ `full` อยู่ในหน่วยความจำทั้งหมดและไม่ fallback ไปยัง callback ของระบบไฟล์ host หรือ session ส่วน VFS แบบ `layer` จะ fallback ไปยัง host เมื่อ cache miss และใช้ `removedPaths` เพื่อซ่อนไฟล์หรือไดเรกทอรีที่มีอยู่บน host ได้ ทั้งสองแบบรองรับ symbolic link ภายในระบบไฟล์เสมือนและไปยัง path ของ host',
        'limit_h': 'ข้อจำกัดปัจจุบัน',
        'limit': 'snapshot ที่ใช้ VFS ยังนับเป็น snapshot จริง ดังนั้น API เนทีฟยังคงข้อจำกัดให้มี snapshot จริงได้ครั้งละหนึ่งรายการ การทำงานกับ snapshot จึงยังเป็นแบบลำดับในขณะนี้',
        'source_h': 'แหล่งข้อมูล',
        'source_prefix': 'อ่าน pull request ของ TypeScript ที่ merge แล้ว:',
        'summary': 'API เนทีฟของ TypeScript สามารถอัปเดต snapshot ด้วยข้อมูล VFS ในหน่วยความจำหรือแบบเป็นชั้นสำหรับการเพิ่ม แก้ไข ลบ และ fallback ไปยัง host ได้แล้ว',
    },
    'ru-ru': {
        'title': 'Нативный API TypeScript добавляет многоуровневые виртуальные файловые системы',
        'description': 'Нативный API TypeScript может обновлять snapshot с виртуальными файловыми системами в памяти или слоями, включая добавление, изменение, удаление и fallback к host-системе.',
        'date': '**Опубликовано:** 9 сентября 2026 г.',
        'intro': 'Нативный API TypeScript теперь может создавать и обновлять snapshot с явно заданными данными виртуальной файловой системы. Инструменты могут моделировать добавление, изменение и удаление файлов без повторного построения всего ввода файловой системы.',
        'what': 'Что изменилось',
        'p1': 'Новые вспомогательные функции `createFileSystem`, `createFileSystemWithLib` и `createFileSystemLayer` создают объекты VFS, которые принимают API snapshot. `Snapshot.update` может накладывать новый слой кэша поверх существующего snapshot.',
        'p2': 'VFS типа `full` полностью находится в памяти и не обращается к callback файловой системы host или session. VFS типа `layer` обращается к host при промахе кэша и может использовать `removedPaths`, чтобы скрывать файлы или каталоги, существующие на host. Оба варианта поддерживают символические ссылки внутри виртуальной файловой системы и на пути host.',
        'limit_h': 'Текущее ограничение',
        'limit': 'Snapshot на основе VFS по-прежнему считаются реальными snapshot, поэтому нативный API сохраняет ограничение на один реальный snapshot одновременно. Пока операции со snapshot остаются последовательными.',
        'source_h': 'Источник',
        'source_prefix': 'Прочитайте объединённый pull request TypeScript:',
        'summary': 'Нативный API TypeScript теперь может обновлять snapshot с VFS в памяти или слоями для добавления, изменения, удаления и fallback к host.',
    },
    'ar': {
        'title': 'واجهة TypeScript الأصلية تضيف أنظمة ملفات افتراضية متعددة الطبقات',
        'description': 'يمكن لواجهة TypeScript الأصلية تحديث اللقطات باستخدام أنظمة ملفات افتراضية في الذاكرة أو متعددة الطبقات، مع الإضافة والتعديل والحذف والرجوع إلى نظام المضيف.',
        'date': '**تاريخ النشر:** 9 سبتمبر 2026',
        'intro': 'يمكن لواجهة TypeScript الأصلية الآن إنشاء اللقطات وتحديثها باستخدام بيانات صريحة لنظام ملفات افتراضي. يتيح ذلك للأدوات تمثيل إضافة الملفات وتعديلها وحذفها من دون إعادة إنشاء مُدخلات نظام الملفات بالكامل.',
        'what': 'ما الذي تغير',
        'p1': 'تنشئ الدوال المساعدة الجديدة `createFileSystem` و`createFileSystemWithLib` و`createFileSystemLayer` كائنات VFS تقبلها واجهات اللقطات. ويمكن لـ `Snapshot.update` تطبيق طبقة cache جديدة فوق لقطة موجودة.',
        'p2': 'يبقى VFS من نوع `full` بالكامل في الذاكرة ولا يرجع إلى callbacks لنظام ملفات المضيف أو الجلسة. أما VFS من نوع `layer` فيرجع إلى المضيف عند فقدان البيانات من cache، ويمكنه استخدام `removedPaths` لإخفاء ملفات أو مجلدات موجودة على المضيف. ويدعم النوعان الروابط الرمزية داخل نظام الملفات الافتراضي وإلى مسارات المضيف.',
        'limit_h': 'القيد الحالي',
        'limit': 'تظل اللقطات المدعومة بـ VFS محسوبة كلقطات حقيقية، لذلك تحتفظ الواجهة الأصلية بالقيد الحالي الذي يسمح بلقطة حقيقية واحدة فقط في الوقت نفسه. ولهذا تبقى عمليات اللقطات تسلسلية في الوقت الحالي.',
        'source_h': 'المصدر',
        'source_prefix': 'اقرأ طلب السحب المدمج في TypeScript:',
        'summary': 'يمكن لواجهة TypeScript الأصلية الآن تحديث اللقطات ببيانات VFS في الذاكرة أو متعددة الطبقات لتمثيل الإضافة والتعديل والحذف والرجوع إلى المضيف.',
    },
}

EXPECTED = {'root', 'zh-cn', 'it-it', 'pt-br', 'sv-se', 'bg-bg', 'es-es', 'ja-jp', 'fr-fr', 'ko-kr', 'id-id', 'de-de', 'pl-pl', 'tr-tr', 'vi-vn', 'th-th', 'ru-ru', 'ar'}
if set(DATA) != EXPECTED:
    raise SystemExit(f'locale data mismatch: {set(DATA) ^ EXPECTED}')


def news_dir(locale: str) -> Path:
    return DOCS / 'typescript-news' if locale == 'root' else DOCS / locale / 'typescript-news'


def render_article(d: dict[str, str]) -> str:
    return f'''---
title: {d["title"]}
description: {d["description"]}
lastUpdated: {DATE}
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '{DATE}'
---

{d["date"]}

{d["intro"]}

## {d["what"]}

{d["p1"]}

{d["p2"]}

## {d["limit_h"]}

{d["limit"]}

## {d["source_h"]}

{d["source_prefix"]} [Add optional VFS parameters to updateSnapshot]({SOURCE}).
'''


def index_block(d: dict[str, str]) -> str:
    return f'''### [{d["title"]}](./2026/{SLUG}/)

{d["date"]}

{d["summary"]}
'''

for locale, d in DATA.items():
    nd = news_dir(locale)
    article_path = nd / '2026' / f'{SLUG}.md'
    if article_path.exists():
        raise SystemExit(f'article already exists: {article_path}')

    article_files = [p for p in nd.glob('**/*.md') if p.name != 'index.md']
    if not article_files:
        raise SystemExit(f'no existing articles for {locale}')

    for path in article_files:
        text = path.read_text(encoding='utf-8')
        pattern = r'(sidebar:\n    order: )(\d+)'
        updated, count = re.subn(pattern, lambda m: m.group(1) + str(int(m.group(2)) + 1), text, count=1)
        if count != 1:
            raise SystemExit(f'expected one sidebar order in {path}, found {count}')
        path.write_text(updated, encoding='utf-8')

    article_path.parent.mkdir(parents=True, exist_ok=True)
    article_path.write_text(render_article(d), encoding='utf-8')

    index_path = nd / 'index.md'
    index = index_path.read_text(encoding='utf-8')
    marker = re.search(r'^## .+$', index, flags=re.MULTILINE)
    if not marker:
        raise SystemExit(f'latest-news heading not found in {index_path}')
    block = index_block(d)
    index = index[:marker.end()] + '\n\n' + block + '\n' + index[marker.end():].lstrip('\n')
    index_path.write_text(index, encoding='utf-8')

print(f'Generated {SLUG} in {len(DATA)} locales and incremented existing news orders.')
