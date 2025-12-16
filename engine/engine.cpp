#include "engine.h"
#include <cstring>
#include <algorithm>

extern "C" {

ENGINE_API int add(int a, int b) {
    return a + b;
}

ENGINE_API int multiply(int a, int b) {
    return a * b;
}

ENGINE_API long long factorial(int n) {
    if (n < 0) {
        return -1; // Error: negative number
    }
    if (n == 0 || n == 1) {
        return 1;
    }
    
    long long result = 1;
    for (int i = 2; i <= n; ++i) {
        result *= i;
    }
    return result;
}

ENGINE_API int process_string(const char* input, char* output, int output_size) {
    if (input == nullptr || output == nullptr || output_size <= 0) {
        return -1; // Error
    }
    
    int input_len = strlen(input);
    int copy_len = std::min(input_len, output_size - 1);
    
    // Convert to uppercase and copy
    for (int i = 0; i < copy_len; ++i) {
        if (input[i] >= 'a' && input[i] <= 'z') {
            output[i] = input[i] - 'a' + 'A';
        } else {
            output[i] = input[i];
        }
    }
    output[copy_len] = '\0';
    
    return copy_len;
}

ENGINE_API double sum_array(double* array, int size) {
    if (array == nullptr || size <= 0) {
        return 0.0;
    }
    
    double sum = 0.0;
    for (int i = 0; i < size; ++i) {
        sum += array[i];
    }
    return sum;
}

} // extern "C"
