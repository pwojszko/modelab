#ifndef ENGINE_H
#define ENGINE_H

#ifdef __cplusplus
extern "C" {
#endif

// Export macros for Windows
#ifdef _WIN32
    #ifdef ENGINE_EXPORTS
        #define ENGINE_API __declspec(dllexport)
    #else
        #define ENGINE_API __declspec(dllimport)
    #endif
#else
    #define ENGINE_API
#endif

// Example function: Add two numbers
ENGINE_API int add(int a, int b);

// Example function: Multiply two numbers
ENGINE_API int multiply(int a, int b);

// Example function: Calculate factorial
ENGINE_API long long factorial(int n);

// Example function: Process string (returns length)
ENGINE_API int process_string(const char* input, char* output, int output_size);

// Example function: Calculate sum of array
ENGINE_API double sum_array(double* array, int size);

#ifdef __cplusplus
}
#endif

#endif // ENGINE_H
