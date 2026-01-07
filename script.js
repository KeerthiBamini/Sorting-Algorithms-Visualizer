// ============================================
// SORTING ALGORITHM VISUALIZER
// Complete implementation with step-by-step control
// ============================================

// Global state management
const state = {
    array: [],
    originalArray: [],
    steps: [],
    currentStepIndex: -1,
    isRunning: false,
    algorithm: 'bubble',
    comparisons: 0,
    swaps: 0
};

// DOM Elements
const elements = {
    algorithmSelect: document.getElementById('algorithmSelect'),
    arraySize: document.getElementById('arraySize'),
    arraySizeValue: document.getElementById('arraySizeValue'),
    customArray: document.getElementById('customArray'),
    randomizeBtn: document.getElementById('randomizeBtn'),
    startBtn: document.getElementById('startBtn'),
    nextStepBtn: document.getElementById('nextStepBtn'),
    prevStepBtn: document.getElementById('prevStepBtn'),
    resetBtn: document.getElementById('resetBtn'),
    arrayContainer: document.getElementById('arrayContainer'),
    comparisons: document.getElementById('comparisons'),
    swaps: document.getElementById('swaps'),
    currentStep: document.getElementById('currentStep'),
    totalSteps: document.getElementById('totalSteps'),
    timeBest: document.getElementById('timeBest'),
    timeAvg: document.getElementById('timeAvg'),
    timeWorst: document.getElementById('timeWorst'),
    space: document.getElementById('space'),
    pseudocode: document.getElementById('pseudocode'),
    explanation: document.getElementById('explanation'),
    themeToggle: document.getElementById('themeToggle'),
    themeIcon: document.getElementById('themeIcon'),
    themeText: document.getElementById('themeText')
};

// ============================================
// ALGORITHM COMPLEXITY DATA
// ============================================
const algorithmData = {
    bubble: {
        name: 'Bubble Sort',
        timeBest: 'O(n)',
        timeAvg: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        pseudocode: `function bubbleSort(arr):
    n = length(arr)
    for i from 0 to n-1:
        swapped = false
        for j from 0 to n-i-2:
            if arr[j] > arr[j+1]:
                swap(arr[j], arr[j+1])
                swapped = true
        if not swapped:
            break`
    },
    selection: {
        name: 'Selection Sort',
        timeBest: 'O(n²)',
        timeAvg: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        pseudocode: `function selectionSort(arr):
    n = length(arr)
    for i from 0 to n-1:
        minIndex = i
        for j from i+1 to n:
            if arr[j] < arr[minIndex]:
                minIndex = j
        swap(arr[i], arr[minIndex])`
    },
    insertion: {
        name: 'Insertion Sort',
        timeBest: 'O(n)',
        timeAvg: 'O(n²)',
        timeWorst: 'O(n²)',
        space: 'O(1)',
        pseudocode: `function insertionSort(arr):
    for i from 1 to n-1:
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j = j - 1
        arr[j+1] = key`
    },
    merge: {
        name: 'Merge Sort',
        timeBest: 'O(n log n)',
        timeAvg: 'O(n log n)',
        timeWorst: 'O(n log n)',
        space: 'O(n)',
        pseudocode: `function mergeSort(arr, left, right):
    if left < right:
        mid = (left + right) / 2
        mergeSort(arr, left, mid)
        mergeSort(arr, mid+1, right)
        merge(arr, left, mid, right)

function merge(arr, l, m, r):
    Copy arr[l..m] to L[]
    Copy arr[m+1..r] to R[]
    Merge L[] and R[] back to arr[]`
    },
    quick: {
        name: 'Quick Sort',
        timeBest: 'O(n log n)',
        timeAvg: 'O(n log n)',
        timeWorst: 'O(n²)',
        space: 'O(log n)',
        pseudocode: `function quickSort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quickSort(arr, low, pi-1)
        quickSort(arr, pi+1, high)

function partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j from low to high-1:
        if arr[j] < pivot:
            i++
            swap(arr[i], arr[j])
    swap(arr[i+1], arr[high])`
    },
    heap: {
        name: 'Heap Sort',
        timeBest: 'O(n log n)',
        timeAvg: 'O(n log n)',
        timeWorst: 'O(n log n)',
        space: 'O(1)',
        pseudocode: `function heapSort(arr):
    n = length(arr)
    for i from n/2-1 down to 0:
        heapify(arr, n, i)
    for i from n-1 down to 1:
        swap(arr[0], arr[i])
        heapify(arr, i, 0)

function heapify(arr, n, i):
    largest = i
    left = 2*i + 1
    right = 2*i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        swap(arr[i], arr[largest])
        heapify(arr, n, largest)`
    },
    counting: {
        name: 'Counting Sort',
        timeBest: 'O(n + k)',
        timeAvg: 'O(n + k)',
        timeWorst: 'O(n + k)',
        space: 'O(k)',
        pseudocode: `function countingSort(arr):
    max = maximum value in arr
    count = array of size (max+1)
    output = array of size n
    
    for i from 0 to n-1:
        count[arr[i]]++
    
    for i from 1 to max:
        count[i] += count[i-1]
    
    for i from n-1 down to 0:
        output[count[arr[i]]-1] = arr[i]
        count[arr[i]]--
    
    copy output to arr`
    },
    radix: {
        name: 'Radix Sort',
        timeBest: 'O(d * (n + k))',
        timeAvg: 'O(d * (n + k))',
        timeWorst: 'O(d * (n + k))',
        space: 'O(n + k)',
        pseudocode: `function radixSort(arr):
    max = maximum value in arr
    exp = 1
    while max / exp > 0:
        countingSortByDigit(arr, exp)
        exp *= 10

function countingSortByDigit(arr, exp):
    output = array of size n
    count = array of size 10
    
    for i from 0 to n-1:
        digit = (arr[i] / exp) % 10
        count[digit]++
    
    for i from 1 to 9:
        count[i] += count[i-1]
    
    for i from n-1 down to 0:
        digit = (arr[i] / exp) % 10
        output[count[digit]-1] = arr[i]
        count[digit]--
    
    copy output to arr`
    }
};

// ============================================
// INITIALIZATION
// ============================================
function init() {
    // Theme initialization
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeButton(currentTheme);

    // Generate initial array
    generateRandomArray();
    updateComplexityInfo();

    // Event listeners
    elements.algorithmSelect.addEventListener('change', () => {
        state.algorithm = elements.algorithmSelect.value;
        updateComplexityInfo();
        reset();
    });

    elements.arraySize.addEventListener('input', (e) => {
        elements.arraySizeValue.textContent = e.target.value;
    });

    elements.randomizeBtn.addEventListener('click', generateRandomArray);
    elements.startBtn.addEventListener('click', startVisualization);
    elements.nextStepBtn.addEventListener('click', nextStep);
    elements.prevStepBtn.addEventListener('click', prevStep);
    elements.resetBtn.addEventListener('click', reset);
    elements.themeToggle.addEventListener('click', toggleTheme);

    elements.customArray.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            setCustomArray();
        }
    });
}

// ============================================
// ARRAY GENERATION
// ============================================
function generateRandomArray() {
    const size = parseInt(elements.arraySize.value);
    state.array = Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 1);
    state.originalArray = [...state.array];
    renderArray();
    reset();
}

function setCustomArray() {
    const input = elements.customArray.value.trim();
    if (!input) return;

    const values = input.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v));
    if (values.length === 0) {
        alert('Please enter valid numbers separated by commas');
        return;
    }

    state.array = values;
    state.originalArray = [...state.array];
    elements.arraySize.value = values.length;
    elements.arraySizeValue.textContent = values.length;
    renderArray();
    reset();
    elements.customArray.value = '';
}

// ============================================
// RENDERING
// ============================================
function renderArray(highlightIndices = {}) {
    elements.arrayContainer.innerHTML = '';
    const maxValue = Math.max(...state.array);
    
    state.array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        
        // Set height proportional to value
        const heightPercent = (value / maxValue) * 100;
        bar.style.height = `${heightPercent}%`;
        bar.style.minHeight = '30px';
        
        // Apply colors based on state
        if (highlightIndices.sorted && highlightIndices.sorted.includes(index)) {
            bar.classList.add('sorted');
        } else if (highlightIndices.swapping && highlightIndices.swapping.includes(index)) {
            bar.classList.add('swapping');
        } else if (highlightIndices.comparing && highlightIndices.comparing.includes(index)) {
            bar.classList.add('comparing');
        }
        
        // Add value label
        const valueLabel = document.createElement('span');
        valueLabel.className = 'bar-value';
        valueLabel.textContent = value;
        bar.appendChild(valueLabel);
        
        elements.arrayContainer.appendChild(bar);
    });
}

// ============================================
// STEP CONTROL
// ============================================
function startVisualization() {
    if (state.steps.length > 0) {
        // Already generated, just start from current step
        updateButtons(true);
        return;
    }

    // Generate all steps
    state.steps = [];
    state.currentStepIndex = -1;
    state.comparisons = 0;
    state.swaps = 0;

    // Create a copy of array for step generation
    const arrCopy = [...state.array];

    // Generate steps based on selected algorithm
    switch (state.algorithm) {
        case 'bubble':
            generateBubbleSortSteps(arrCopy);
            break;
        case 'selection':
            generateSelectionSortSteps(arrCopy);
            break;
        case 'insertion':
            generateInsertionSortSteps(arrCopy);
            break;
        case 'merge':
            generateMergeSortSteps(arrCopy);
            break;
        case 'quick':
            generateQuickSortSteps(arrCopy);
            break;
        case 'heap':
            generateHeapSortSteps(arrCopy);
            break;
        case 'counting':
            generateCountingSortSteps(arrCopy);
            break;
        case 'radix':
            generateRadixSortSteps(arrCopy);
            break;
    }

    elements.totalSteps.textContent = state.steps.length;
    updateButtons(true);
    
    if (state.steps.length > 0) {
        elements.explanation.innerHTML = '<strong>Ready to visualize!</strong> Click "Next Step" to begin.';
    }
}

function nextStep() {
    if (state.currentStepIndex < state.steps.length - 1) {
        state.currentStepIndex++;
        applyStep(state.steps[state.currentStepIndex]);
        updateStepInfo();
    }
}

function prevStep() {
    if (state.currentStepIndex > 0) {
        state.currentStepIndex--;
        applyStep(state.steps[state.currentStepIndex]);
        updateStepInfo();
    }
}

function applyStep(step) {
    state.array = [...step.array];
    state.comparisons = step.comparisons || 0;
    state.swaps = step.swaps || 0;
    
    renderArray(step.highlight || {});
    
    elements.comparisons.textContent = state.comparisons;
    elements.swaps.textContent = state.swaps;
    elements.explanation.innerHTML = step.explanation || '';
}

function updateStepInfo() {
    elements.currentStep.textContent = state.currentStepIndex + 1;
    
    // Update button states
    elements.prevStepBtn.disabled = state.currentStepIndex <= 0;
    elements.nextStepBtn.disabled = state.currentStepIndex >= state.steps.length - 1;
    
    if (state.currentStepIndex === state.steps.length - 1) {
        elements.explanation.innerHTML += '<br><br><strong>✅ Sorting Complete!</strong> The array is now fully sorted.';
    }
}

function reset() {
    state.steps = [];
    state.currentStepIndex = -1;
    state.array = [...state.originalArray];
    state.comparisons = 0;
    state.swaps = 0;
    
    renderArray();
    
    elements.comparisons.textContent = '0';
    elements.swaps.textContent = '0';
    elements.currentStep.textContent = '0';
    elements.totalSteps.textContent = '0';
    elements.explanation.innerHTML = 'Select an algorithm and click "Start" to begin visualization.';
    
    updateButtons(false);
}

function updateButtons(started) {
    if (started) {
        elements.startBtn.disabled = true;
        elements.nextStepBtn.disabled = false;
        elements.prevStepBtn.disabled = true;
        elements.randomizeBtn.disabled = true;
        elements.arraySize.disabled = true;
        elements.algorithmSelect.disabled = true;
    } else {
        elements.startBtn.disabled = false;
        elements.nextStepBtn.disabled = true;
        elements.prevStepBtn.disabled = true;
        elements.randomizeBtn.disabled = false;
        elements.arraySize.disabled = false;
        elements.algorithmSelect.disabled = false;
    }
}

// ============================================
// BUBBLE SORT IMPLEMENTATION
// ============================================
function generateBubbleSortSteps(arr) {
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            // Comparing step
            comparisons++;
            state.steps.push({
                array: [...arr],
                highlight: { comparing: [j, j + 1] },
                comparisons,
                swaps,
                explanation: `<strong>Comparing:</strong> arr[${j}] = ${arr[j]} with arr[${j + 1}] = ${arr[j + 1]}<br>` +
                           `${arr[j] > arr[j + 1] ? 'They are out of order, will swap.' : 'They are in correct order.'}`
            });
            
            if (arr[j] > arr[j + 1]) {
                // Swapping step
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swaps++;
                swapped = true;
                
                state.steps.push({
                    array: [...arr],
                    highlight: { swapping: [j, j + 1] },
                    comparisons,
                    swaps,
                    explanation: `<strong>Swapping:</strong> Swapped ${arr[j + 1]} and ${arr[j]}<br>` +
                               `New order: [${arr.join(', ')}]`
                });
            }
        }
        
        // Mark last i elements as sorted
        const sorted = Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx);
        state.steps.push({
            array: [...arr],
            highlight: { sorted },
            comparisons,
            swaps,
            explanation: `<strong>Pass ${i + 1} Complete:</strong> Largest ${i + 1} element(s) are now in correct position.` +
                       (swapped ? '' : '<br><strong>No swaps occurred - array is sorted!</strong>')
        });
        
        if (!swapped) break;
    }
    
    // Final sorted state
    state.steps.push({
        array: [...arr],
        highlight: { sorted: Array.from({ length: n }, (_, i) => i) },
        comparisons,
        swaps,
        explanation: '<strong>Bubble Sort Complete!</strong><br>All elements are now in sorted order.'
    });
}

// ============================================
// SELECTION SORT IMPLEMENTATION
// ============================================
function generateSelectionSortSteps(arr) {
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // Show starting of new pass
        state.steps.push({
            array: [...arr],
            highlight: { comparing: [i], sorted: Array.from({ length: i }, (_, idx) => idx) },
            comparisons,
            swaps,
            explanation: `<strong>Pass ${i + 1}:</strong> Finding minimum element from index ${i} to ${n - 1}`
        });
        
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            
            state.steps.push({
                array: [...arr],
                highlight: { 
                    comparing: [j, minIndex],
                    sorted: Array.from({ length: i }, (_, idx) => idx)
                },
                comparisons,
                swaps,
                explanation: `<strong>Comparing:</strong> arr[${j}] = ${arr[j]} with current minimum arr[${minIndex}] = ${arr[minIndex]}<br>` +
                           `${arr[j] < arr[minIndex] ? `Found new minimum: ${arr[j]}` : `${arr[minIndex]} remains minimum`}`
            });
            
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap if needed
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            swaps++;
            
            state.steps.push({
                array: [...arr],
                highlight: { 
                    swapping: [i, minIndex],
                    sorted: Array.from({ length: i }, (_, idx) => idx)
                },
                comparisons,
                swaps,
                explanation: `<strong>Swapping:</strong> Placed minimum element ${arr[i]} at position ${i}`
            });
        }
        
        // Mark element as sorted
        state.steps.push({
            array: [...arr],
            highlight: { sorted: Array.from({ length: i + 1 }, (_, idx) => idx) },
            comparisons,
            swaps,
            explanation: `<strong>Pass ${i + 1} Complete:</strong> First ${i + 1} element(s) are now sorted.`
        });
    }
    
    // Final sorted state
    state.steps.push({
        array: [...arr],
        highlight: { sorted: Array.from({ length: n }, (_, i) => i) },
        comparisons,
        swaps,
        explanation: '<strong>Selection Sort Complete!</strong><br>All elements are now in sorted order.'
    });
}

// ============================================
// INSERTION SORT IMPLEMENTATION
// ============================================
function generateInsertionSortSteps(arr) {
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    
    // First element is already "sorted"
    state.steps.push({
        array: [...arr],
        highlight: { sorted: [0] },
        comparisons,
        swaps,
        explanation: '<strong>Starting:</strong> First element is considered sorted.'
    });
    
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        
        state.steps.push({
            array: [...arr],
            highlight: { 
                comparing: [i],
                sorted: Array.from({ length: i }, (_, idx) => idx)
            },
            comparisons,
            swaps,
            explanation: `<strong>Pass ${i}:</strong> Inserting element ${key} into sorted portion [0...${i - 1}]`
        });
        
        while (j >= 0 && arr[j] > key) {
            comparisons++;
            
            state.steps.push({
                array: [...arr],
                highlight: { comparing: [j, j + 1] },
                comparisons,
                swaps,
                explanation: `<strong>Comparing:</strong> ${arr[j]} > ${key}, shifting ${arr[j]} to the right`
            });
            
            arr[j + 1] = arr[j];
            swaps++;
            
            state.steps.push({
                array: [...arr],
                highlight: { swapping: [j, j + 1] },
                comparisons,
                swaps,
                explanation: `<strong>Shifting:</strong> Moved ${arr[j]} one position right`
            });
            
            j--;
        }
        
        if (j >= 0) comparisons++;
        
        arr[j + 1] = key;
        
        state.steps.push({
            array: [...arr],
            highlight: { sorted: Array.from({ length: i + 1 }, (_, idx) => idx) },
            comparisons,
            swaps,
            explanation: `<strong>Inserted:</strong> Placed ${key} at position ${j + 1}. First ${i + 1} elements are now sorted.`
        });
    }
    
    // Final sorted state
    state.steps.push({
        array: [...arr],
        highlight: { sorted: Array.from({ length: n }, (_, i) => i) },
        comparisons,
        swaps,
        explanation: '<strong>Insertion Sort Complete!</strong><br>All elements are now in sorted order.'
    });
}

// ============================================
// MERGE SORT IMPLEMENTATION
// ============================================
function generateMergeSortSteps(arr) {
    let comparisons = 0;
    let swaps = 0;
    
    function mergeSort(arr, left, right, depth = 0) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            state.steps.push({
                array: [...arr],
                highlight: { 
                    comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i)
                },
                comparisons,
                swaps,
                explanation: `<strong>Divide:</strong> Splitting array[${left}...${right}] into two halves at mid=${mid}`
            });
            
            mergeSort(arr, left, mid, depth + 1);
            mergeSort(arr, mid + 1, right, depth + 1);
            merge(arr, left, mid, right);
        }
    }
    
    function merge(arr, left, mid, right) {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        
        state.steps.push({
            array: [...arr],
            highlight: { 
                comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i)
            },
            comparisons,
            swaps,
            explanation: `<strong>Merging:</strong> Combining sorted subarrays [${leftArr}] and [${rightArr}]`
        });
        
        let i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            comparisons++;
            
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            
            swaps++;
            state.steps.push({
                array: [...arr],
                highlight: { swapping: [k] },
                comparisons,
                swaps,
                explanation: `<strong>Merging:</strong> Placed ${arr[k]} at position ${k}`
            });
            
            k++;
        }
        
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            swaps++;
            state.steps.push({
                array: [...arr],
                highlight: { swapping: [k] },
                comparisons,
                swaps,
                explanation: `<strong>Copying:</strong> Remaining element ${arr[k]} from left subarray`
            });
            i++;
            k++;
        }
        
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            swaps++;
            state.steps.push({
                array: [...arr],
                highlight: { swapping: [k] },
                comparisons,
                swaps,
                explanation: `<strong>Copying:</strong> Remaining element ${arr[k]} from right subarray`
            });
            j++;
            k++;
        }
    }
    
    mergeSort(arr, 0, arr.length - 1);
    
    // Final sorted state
    state.steps.push({
        array: [...arr],
        highlight: { sorted: Array.from({ length: arr.length }, (_, i) => i) },
        comparisons,
        swaps,
        explanation: '<strong>Merge Sort Complete!</strong><br>All elements are now in sorted order.'
    });
}

// ============================================
// QUICK SORT IMPLEMENTATION
// ============================================
function generateQuickSortSteps(arr) {
    let comparisons = 0;
    let swaps = 0;
    
    function quickSort(arr, low, high) {
        if (low < high) {
            state.steps.push({
                array: [...arr],
                highlight: { 
                    comparing: Array.from({ length: high - low + 1 }, (_, i) => low + i)
                },
                comparisons,
                swaps,
                explanation: `<strong>QuickSort:</strong> Sorting subarray from index ${low} to ${high}`
            });
            
            const pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        } else if (low === high) {
            state.steps.push({
                array: [...arr],
                highlight: { sorted: [low] },
                comparisons,
                swaps,
                explanation: `<strong>Base Case:</strong> Single element at index ${low} is already sorted`
            });
        }
    }
    
    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        
        state.steps.push({
            array: [...arr],
            highlight: { comparing: [high] },
            comparisons,
            swaps,
            explanation: `<strong>Partition:</strong> Using ${pivot} (at index ${high}) as pivot`
        });
        
        for (let j = low; j < high; j++) {
            comparisons++;
            
            state.steps.push({
                array: [...arr],
                highlight: { comparing: [j, high] },
                comparisons,
                swaps,
                explanation: `<strong>Comparing:</strong> arr[${j}] = ${arr[j]} with pivot ${pivot}<br>` +
                           `${arr[j] < pivot ? 'Element is smaller, will be placed before pivot' : 'Element is larger, will be placed after pivot'}`
            });
            
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                swaps++;
                
                state.steps.push({
                    array: [...arr],
                    highlight: { swapping: [i, j] },
                    comparisons,
                    swaps,
                    explanation: `<strong>Swapping:</strong> Moved ${arr[i]} to position ${i} (before pivot)`
                });
            }
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        swaps++;
        
        state.steps.push({
            array: [...arr],
            highlight: { swapping: [i + 1, high], sorted: [i + 1] },
            comparisons,
            swaps,
            explanation: `<strong>Pivot Placement:</strong> Placed pivot ${pivot} at its final position ${i + 1}`
        });
        
        return i + 1;
    }
    
    quickSort(arr, 0, arr.length - 1);
    
    // Final sorted state
    state.steps.push({
        array: [...arr],
        highlight: { sorted: Array.from({ length: arr.length }, (_, i) => i) },
        comparisons,
        swaps,
        explanation: '<strong>Quick Sort Complete!</strong><br>All elements are now in sorted order.'
    });
}

// ============================================
// HEAP SORT IMPLEMENTATION
// ============================================
function generateHeapSortSteps(arr) {
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    
    function heapify(arr, n, i) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        
        state.steps.push({
            array: [...arr],
            highlight: { comparing: [i] },
            comparisons,
            swaps,
            explanation: `<strong>Heapify:</strong> Checking node at index ${i} (value: ${arr[i]})`
        });
        
        if (left < n) {
            comparisons++;
            if (arr[left] > arr[largest]) {
                largest = left;
            }
        }
        
        if (right < n) {
            comparisons++;
            if (arr[right] > arr[largest]) {
                largest = right;
            }
        }
        
        if (largest !== i) {
            state.steps.push({
                array: [...arr],
                highlight: { comparing: [i, largest] },
                comparisons,
                swaps,
                explanation: `<strong>Heap Property Violated:</strong> Child ${arr[largest]} > Parent ${arr[i]}, swapping`
            });
            
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            swaps++;
            
            state.steps.push({
                array: [...arr],
                highlight: { swapping: [i, largest] },
                comparisons,
                swaps,
                explanation: `<strong>Swapped:</strong> ${arr[largest]} and ${arr[i]} to maintain max-heap property`
            });
            
            heapify(arr, n, largest);
        }
    }
    
    // Build max heap
    state.steps.push({
        array: [...arr],
        highlight: {},
        comparisons,
        swaps,
        explanation: '<strong>Phase 1:</strong> Building max-heap from unordered array'
    });
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    state.steps.push({
        array: [...arr],
        highlight: {},
        comparisons,
        swaps,
        explanation: '<strong>Max-Heap Built!</strong> Largest element is now at root (index 0)'
    });
    
    // Extract elements from heap
    state.steps.push({
        array: [...arr],
        highlight: {},
        comparisons,
        swaps,
        explanation: '<strong>Phase 2:</strong> Extracting elements one by one to get sorted array'
    });
    
    for (let i = n - 1; i > 0; i--) {
        state.steps.push({
            array: [...arr],
            highlight: { comparing: [0, i] },
            comparisons,
            swaps,
            explanation: `<strong>Extracting Max:</strong> Moving largest element ${arr[0]} to position ${i}`
        });
        
        [arr[0], arr[i]] = [arr[i], arr[0]];
        swaps++;
        
        state.steps.push({
            array: [...arr],
            highlight: { 
                swapping: [0, i],
                sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx)
            },
            comparisons,
            swaps,
            explanation: `<strong>Swapped:</strong> Max element ${arr[i]} is now in its final position`
        });
        
        heapify(arr, i, 0);
    }
    
    // Final sorted state
    state.steps.push({
        array: [...arr],
        highlight: { sorted: Array.from({ length: n }, (_, i) => i) },
        comparisons,
        swaps,
        explanation: '<strong>Heap Sort Complete!</strong><br>All elements are now in sorted order.'
    });
}

// ============================================
// COUNTING SORT IMPLEMENTATION
// ============================================
function generateCountingSortSteps(arr) {
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    const max = Math.max(...arr);
    
    state.steps.push({
        array: [...arr],
        highlight: {},
        comparisons,
        swaps,
        explanation: `<strong>Counting Sort:</strong> Maximum value is ${max}. Creating count array of size ${max + 1}`
    });
    
    const count = new Array(max + 1).fill(0);
    const output = new Array(n);
    
    // Count occurrences
    for (let i = 0; i < n; i++) {
        count[arr[i]]++;
        comparisons++;
        
        state.steps.push({
            array: [...arr],
            highlight: { comparing: [i] },
            comparisons,
            swaps,
            explanation: `<strong>Counting:</strong> Found ${arr[i]} at index ${i}. Count[${arr[i]}] = ${count[arr[i]]}`
        });
    }
    
    state.steps.push({
        array: [...arr],
        highlight: {},
        comparisons,
        swaps,
        explanation: `<strong>Count Array:</strong> [${count.join(', ')}]<br>Now calculating cumulative counts...`
    });
    
    // Calculate cumulative counts
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }
    
    state.steps.push({
        array: [...arr],
        highlight: {},
        comparisons,
        swaps,
        explanation: `<strong>Cumulative Count:</strong> [${count.join(', ')}]<br>These indicate final positions of elements`
    });
    
    // Build output array
    for (let i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
        swaps++;
        
        state.steps.push({
            array: [...arr],
            highlight: { comparing: [i] },
            comparisons,
            swaps,
            explanation: `<strong>Placing:</strong> Element ${arr[i]} goes to position ${count[arr[i]]} in output array`
        });
    }
    
    // Copy to original array
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
    
    state.steps.push({
        array: [...arr],
        highlight: { sorted: Array.from({ length: n }, (_, i) => i) },
        comparisons,
        swaps,
        explanation: '<strong>Counting Sort Complete!</strong><br>All elements are now in sorted order.'
    });
}

// ============================================
// RADIX SORT IMPLEMENTATION
// ============================================
function generateRadixSortSteps(arr) {
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;
    const max = Math.max(...arr);
    
    state.steps.push({
        array: [...arr],
        highlight: {},
        comparisons,
        swaps,
        explanation: `<strong>Radix Sort:</strong> Maximum value is ${max}. Will sort digit by digit from least to most significant.`
    });
    
    function countingSortByDigit(arr, exp) {
        const output = new Array(n);
        const count = new Array(10).fill(0);
        
        state.steps.push({
            array: [...arr],
            highlight: {},
            comparisons,
            swaps,
            explanation: `<strong>Sorting by ${exp === 1 ? 'Ones' : exp === 10 ? 'Tens' : 'Hundreds'} place:</strong> Processing digit at position ${Math.log10(exp)}`
        });
        
        // Count occurrences
        for (let i = 0; i < n; i++) {
            const digit = Math.floor(arr[i] / exp) % 10;
            count[digit]++;
            comparisons++;
        }
        
        // Cumulative count
        for (let i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }
        
        // Build output
        for (let i = n - 1; i >= 0; i--) {
            const digit = Math.floor(arr[i] / exp) % 10;
            output[count[digit] - 1] = arr[i];
            count[digit]--;
            swaps++;
            
            state.steps.push({
                array: [...arr],
                highlight: { comparing: [i] },
                comparisons,
                swaps,
                explanation: `<strong>Processing:</strong> Element ${arr[i]} has digit ${digit} at current place, placing in output`
            });
        }
        
        // Copy back
        for (let i = 0; i < n; i++) {
            arr[i] = output[i];
        }
        
        state.steps.push({
            array: [...arr],
            highlight: {},
            comparisons,
            swaps,
            explanation: `<strong>After sorting by ${exp === 1 ? 'ones' : exp === 10 ? 'tens' : 'hundreds'} place:</strong> [${arr.join(', ')}]`
        });
    }
    
    // Process each digit
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countingSortByDigit(arr, exp);
    }
    
    state.steps.push({
        array: [...arr],
        highlight: { sorted: Array.from({ length: n }, (_, i) => i) },
        comparisons,
        swaps,
        explanation: '<strong>Radix Sort Complete!</strong><br>All elements are now in sorted order.'
    });
}

// ============================================
// UI HELPERS
// ============================================
function updateComplexityInfo() {
    const data = algorithmData[state.algorithm];
    elements.timeBest.textContent = data.timeBest;
    elements.timeAvg.textContent = data.timeAvg;
    elements.timeWorst.textContent = data.timeWorst;
    elements.space.textContent = data.space;
    elements.pseudocode.textContent = data.pseudocode;
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    if (theme === 'dark') {
        elements.themeIcon.textContent = '🌙';
        elements.themeText.textContent = 'Dark Mode';
    } else {
        elements.themeIcon.textContent = '☀️';
        elements.themeText.textContent = 'Light Mode';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
